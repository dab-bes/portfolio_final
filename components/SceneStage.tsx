"use client";

import { useEffect } from "react";
import { useScene, type SceneId, SCENE_LABELS } from "@/components/SceneContext";
import { Scene1About } from "@/components/scenes/Scene1About";
import { Scene2Portfolio } from "@/components/scenes/Scene2Portfolio";
import { Scene3Connect } from "@/components/scenes/Scene3Connect";

const SCENE_CONTENT: Record<
  SceneId,
  { heading: string; body: string | readonly string[] }
> = {
  1: {
    heading: SCENE_LABELS[1],
    body: [
      "There is a myth that because of the iron in our ethmoid bone, located in our nose, people possess the ability to connect to the Earth's magnetic field and easily point the way North.",
      "Do I believe I have a surplus of iron in my nose? I mean maybe I do but my doctors keep telling me I'm iron deficient so: not likely.",
      "But iron or no iron, I have always had the ability to effortlessly direct the path North and to me direction is everything.",
      "Not only can I get us out of a corn maze, but my sense of direction has always pointed me towards exploration and success. My internal compass has brought me to art, creativity, and acting. I've explored new languages in both human and computer, and now it gives me the drive to create a meaningful life.",
      "I am curious, resourceful, adaptive and always happy to laugh at your bad (or good!) jokes. And I want to make things! Dinners! Sketch comedy! Fashionable hoodies! Websites! All of the above.",
      "I've got a long and expansive laundry list so hopefully I'll get to it all, but honestly I likely will.",
      'Because if I\'m looking for something or when I have a goal in mind and need to figure out the path forward; I can always trust my nose to guide me and say: "North is that way."',
    ],
  },
  2: {
    heading: SCENE_LABELS[2],
    body: "",
  },
  3: {
    heading: SCENE_LABELS[3],
    body: "",
  },
};

export function SceneStage() {
  const { scene } = useScene();

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    console.log("[portfolio cover→studio] NEW: SceneStage mounted");
    return () => console.log("[portfolio studio→…] SceneStage unmounted");
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    console.log("[portfolio:studio] SceneStage — active scene:", scene === null ? "(none selected)" : scene);
  }, [scene]);

  if (scene === null) {
    return <div className="flex min-h-0 flex-1 flex-col px-4 py-8 text-white" />;
  }

  const { heading, body } = SCENE_CONTENT[scene];

  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 py-8 text-white">
      <section
        key={scene}
        aria-label={`${heading} content`}
        className={`mx-auto flex min-h-0 w-full flex-1 flex-col rounded-lg bg-black/40 p-8 shadow-lg backdrop-blur-sm ${
          scene === 2 || scene === 3 ? "max-w-5xl" : "max-w-3xl md:max-w-5xl"
        }`}
      >
        {scene === 1 ? (
          <Scene1About heading={heading} body={body} />
        ) : scene === 2 ? (
          <Scene2Portfolio heading={heading} />
        ) : (
          <Scene3Connect heading={heading} />
        )}
      </section>
    </div>
  );
}
