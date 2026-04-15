import * as THREE from "three";

const GLOBE_RADIUS = 1.5;
const GLOBE_FOV = 75;
/**
 * Baseline camera distance before matching CSS. The blue disk was `silhouette * 1.14`; we pull
 * the camera in by that factor so the rendered sphere fills that same disk.
 */
const GLOBE_CAMERA_Z_BASE = 3.55;
const GLOBE_BLUE_DISK_MATCH = 1.14;
/** Camera z used only for CSS disk sizing (matches historical framing). */
const GLOBE_CAMERA_Z_FOR_CSS =
  GLOBE_CAMERA_Z_BASE / GLOBE_BLUE_DISK_MATCH;
/**
 * >1 moves the Three.js camera farther than the CSS baseline so the textured globe renders
 * slightly smaller than the blue backing while disk sizes stay the same.
 */
const GLOBE_RENDER_PULL_BACK = 1.065;
const GLOBE_CAMERA_Z = GLOBE_CAMERA_Z_FOR_CSS * GLOBE_RENDER_PULL_BACK;

/** Projected globe diameter as a fraction of the square viewport (for CSS backing / veil disks). */
export const GLOBE_SILHOUETTE_SIZE_FRAC =
  (2 * GLOBE_RADIUS) /
  (2 * GLOBE_CAMERA_Z_FOR_CSS * Math.tan(((GLOBE_FOV / 180) * Math.PI) / 2));

export type CreateGlobeOptions = {
  textureUrl?: string;
  size?: number;
  rotationSpeed?: number;
  pinPosition?: [number, number, number];
};

export type GlobeController = {
  globe: THREE.Mesh;
  setSize: (size: number) => void;
  destroy: () => void;
};

/**
 * Three.js globe from the legacy connect section (textured sphere, NYC pin, outline shader, halo, ring).
 */
export function createGlobe(
  canvas: HTMLCanvasElement,
  options: CreateGlobeOptions = {},
): GlobeController {
  const {
    textureUrl = "/globe-texture.png",
    size = 600,
    rotationSpeed = 0.005,
    pinPosition = [0.48, 0.165, 1.43],
  } = options;

  let animationId: number | null = null;
  let scene: THREE.Scene | null = null;
  let renderer: THREE.WebGLRenderer | null = null;
  let camera: THREE.PerspectiveCamera | null = null;
  let globe: THREE.Mesh | null = null;
  let nycPin: THREE.Mesh | null = null;

  function stop() {
    if (animationId != null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  /** `next` = CSS px for the square; backing store uses device pixel ratio. */
  function applyRendererSize(next: number) {
    const css = Math.max(1, Math.floor(next));
    if (!renderer || !camera) return;
    const pr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pr);
    renderer.setSize(css, css, false);
    canvas.style.width = `${css}px`;
    canvas.style.height = `${css}px`;
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }

  scene = new THREE.Scene();

  scene.add(new THREE.AmbientLight(0x404040, 0.3));

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(2.5, 2, 2);
  scene.add(directionalLight);

  const backLight = new THREE.DirectionalLight(0x000000, 0);
  backLight.position.set(-2, -1, -1);
  scene.add(backLight);

  camera = new THREE.PerspectiveCamera(GLOBE_FOV, 1, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    premultipliedAlpha: false,
  });
  renderer.setClearColor(0x000000, 0);
  applyRendererSize(size);

  const textureLoader = new THREE.TextureLoader();
  const globeTexture = textureLoader.load(textureUrl);

  const globeGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 32);
  const globeMaterial = new THREE.MeshPhongMaterial({
    map: globeTexture,
    transparent: false,
    opacity: 1.0,
    shininess: 1,
    specular: 0x888888,
    reflectivity: 0.02,
  });
  globe = new THREE.Mesh(globeGeometry, globeMaterial);
  scene.add(globe);

  const pinGeometry = new THREE.SphereGeometry(0.03, 8, 8);
  const pinMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  nycPin = new THREE.Mesh(pinGeometry, pinMaterial);
  nycPin.position.set(pinPosition[0], pinPosition[1], pinPosition[2]);
  globe.add(nycPin);

  const borderGeometry = new THREE.SphereGeometry(GLOBE_RADIUS * 1.01, 64, 32);
  const borderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      map: { value: globeTexture },
      resolution: { value: new THREE.Vector2(512, 512) },
      outlineWidth: { value: 0.1 },
      outlineColor: { value: new THREE.Color(0xffffff) },
    },
    vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
    fragmentShader: `
            uniform sampler2D map;
            uniform vec2 resolution;
            uniform float outlineWidth;
            uniform vec3 outlineColor;
            varying vec2 vUv;

            void main() {
                vec2 texelSize = 1.0 / resolution;
                vec4 center = texture2D(map, vUv);
                vec4 left = texture2D(map, vUv + vec2(-texelSize.x * outlineWidth, 0.0));
                vec4 right = texture2D(map, vUv + vec2(texelSize.x * outlineWidth, 0.0));
                vec4 up = texture2D(map, vUv + vec2(0.0, texelSize.y * outlineWidth));
                vec4 down = texture2D(map, vUv + vec2(0.0, -texelSize.y * outlineWidth));

                float edge = abs(center.a - left.a) + abs(center.a - right.a) +
                            abs(center.a - up.a) + abs(center.a - down.a);

                if (edge > 0.1) {
                    gl_FragColor = vec4(outlineColor, 1.0);
                } else {
                    discard;
                }
            }
        `,
    transparent: true,
    side: THREE.DoubleSide,
  });

  globe.add(new THREE.Mesh(borderGeometry, borderMaterial));

  const circleGeometry = new THREE.SphereGeometry(GLOBE_RADIUS * 1.06, 32, 16);
  const circleMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: false,
    transparent: true,
    opacity: 0.1,
  });
  scene.add(new THREE.Mesh(circleGeometry, circleMaterial));

  const verticalCirclePoints: THREE.Vector3[] = [];
  const verticalRadius = GLOBE_RADIUS * 0.78;
  const segments = 64;
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    verticalCirclePoints.push(
      new THREE.Vector3(
        Math.cos(angle) * verticalRadius,
        0,
        Math.sin(angle) * verticalRadius,
      ),
    );
  }

  const verticalCircleGeometry = new THREE.BufferGeometry().setFromPoints(
    verticalCirclePoints,
  );
  const verticalCircleMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: false,
    linewidth: 5,
  });
  const verticalCircleLine = new THREE.Line(
    verticalCircleGeometry,
    verticalCircleMaterial,
  );
  verticalCircleLine.rotation.x = Math.PI / 2;
  scene.add(verticalCircleLine);

  camera.position.z = GLOBE_CAMERA_Z;

  function animate() {
    if (!globe || !renderer || !scene || !camera) return;
    animationId = requestAnimationFrame(animate);
    globe.rotation.y += rotationSpeed;
    if (nycPin) {
      const pinWorldPosition = new THREE.Vector3();
      nycPin.getWorldPosition(pinWorldPosition);
      nycPin.visible = pinWorldPosition.z >= 0;
    }
    renderer.render(scene, camera);
  }
  animate();

  return {
    globe,
    setSize: applyRendererSize,
    destroy() {
      stop();
      if (scene && renderer) {
        const textures = new Set<THREE.Texture>();
        scene.traverse((o) => {
          const meshLike = o as THREE.Object3D & {
            geometry?: THREE.BufferGeometry;
            material?: THREE.Material | THREE.Material[];
          };
          if (meshLike.geometry) meshLike.geometry.dispose();
          if (meshLike.material) {
            const mats = Array.isArray(meshLike.material)
              ? meshLike.material
              : [meshLike.material];
            for (const m of mats) {
              const mat = m as THREE.Material & {
                uniforms?: Record<string, { value?: unknown }>;
              };
              if (mat.uniforms) {
                for (const u of Object.values(mat.uniforms)) {
                  const v = u?.value;
                  if (v instanceof THREE.Texture) textures.add(v);
                }
              }
              for (const key of Object.keys(mat)) {
                const val = (mat as unknown as Record<string, unknown>)[key];
                if (val instanceof THREE.Texture) textures.add(val);
              }
              mat.dispose();
            }
          }
        });
        textures.forEach((t) => t.dispose());
        renderer.dispose();
      }
      scene = null;
      renderer = null;
      camera = null;
      globe = null;
      nycPin = null;
    },
  };
}
