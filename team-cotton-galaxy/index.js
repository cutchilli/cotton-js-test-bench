import { Animator, Compositor } from "cotton-js";
import BackgroundLayer from "./background-layer";
import TextLayer from "./text-layer";
import Cloud from "./cloud";

export const runGalaxy = function run() {
  const canvas = document.getElementById("yaboi");
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  canvas.width = width;
  canvas.height = height;
  
  let animator = new Animator(
    new Compositor(width, height, canvas, [
      new Cloud(width, height),
      new BackgroundLayer(width, height),
      new TextLayer(width, height, "team"),
      new TextLayer(width, height, "cotton", 70)
    ])
  );
  
  animator.start();
};
