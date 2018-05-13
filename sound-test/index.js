import { Animator, Compositor, Audio, input, EntityLibrary, util } from "cotton-js";
import { C, CSharp, D, DSharp, E, F, FSharp, G, GSharp, A, ASharp, B } from "./piano-sounds"
import {PianoLayer} from "./piano-layer";
import {Piano} from "./piano";

export const runSoundTest = function runSoundTest() {
  const { Vector2 } = util;

  var audio = new Audio();
  const inputHandler = new input.Keyboard(window);

let pianoNotes = [
 {pianoKey: "C", keyboardKey: "A", clip: audio.createSoundClip(C) },
 {pianoKey: "C#", keyboardKey: "W", clip: audio.createSoundClip(CSharp) },
 {pianoKey: "D", keyboardKey: "S", clip: audio.createSoundClip(D) },
 {pianoKey: "D#", keyboardKey: "E", clip: audio.createSoundClip(DSharp) },
 {pianoKey: "E", keyboardKey: "D", clip: audio.createSoundClip(E) },
 {pianoKey: "F", keyboardKey: "F", clip: audio.createSoundClip(F) },
 {pianoKey: "F#", keyboardKey: "T", clip: audio.createSoundClip(FSharp) },
 {pianoKey: "G", keyboardKey: "G", clip: audio.createSoundClip(G) },
 {pianoKey: "G#", keyboardKey: "Y", clip: audio.createSoundClip(GSharp) },
 {pianoKey: "A", keyboardKey: "H", clip: audio.createSoundClip(A) },
 {pianoKey: "A#", keyboardKey: "U", clip: audio.createSoundClip(ASharp) },
 {pianoKey: "B", keyboardKey: "J", clip: audio.createSoundClip(B) }
];

  pianoNotes.forEach(
    pianoNote => 
      inputHandler.addMapping("Key" + pianoNote.keyboardKey, 
                              () => pianoNote.clip.play()
                            )
  )

  const canvas = document.getElementById("yaboi");

  const width = window.innerWidth;
  const height = window.innerHeight;
  
  canvas.width = width;
  canvas.height = height;

  const entityLibrary = new EntityLibrary();

  const piano = new Piano(new Vector2(100, 50), pianoNotes, entityLibrary);

  let animator = new Animator(
    new Compositor(width, height, canvas, [
      new PianoLayer(width, width, piano, entityLibrary)
    ])
  );
  
  animator.start();
};
