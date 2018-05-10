import { Animator, Compositor, Audio, input, EntityLibrary, util } from "cotton-js";
import * as pianoSoundUrls from "./piano-sounds"
import {PianoLayer} from "./piano-layer";
import {Piano} from "./piano";

export const runSoundTest = function runSoundTest() {
  const { Vector2 } = util;

  var audio = new Audio();

  var pianoNotes = {};

  for (let key in pianoSoundUrls) {
    pianoNotes[key] = audio.createSoundClip(pianoSoundUrls[key]);
  }

  // const inputHandler = new input.Keyboard(window);

  // for (let i = 0; i < pianoSoundClips.length; i++) {
  //   const soundClip = pianoSoundClips[i];

  //   const keyCode = 'Digit' + (i + 1);
    
  //   inputHandler.addMapping(keyCode, () => soundClip.play());
  // }

  const canvas = document.getElementById("yaboi");

  const width = window.innerWidth;
  const height = window.innerHeight;
  
  canvas.width = width;
  canvas.height = height;

  const entityLibrary = new EntityLibrary();

  const piano = new Piano(new Vector2(0, 0), pianoNotes, entityLibrary);

  let animator = new Animator(
    new Compositor(width, height, canvas, [
      new PianoLayer(width, width, piano, entityLibrary)
    ])
  );
  
  animator.start();
};
