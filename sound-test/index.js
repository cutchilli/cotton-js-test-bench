import { Animator, Compositor, createSoundClip, input, EntityLibrary, util } from "cotton-js";
import { C, CSharp, D, DSharp, E, F, FSharp, G, GSharp, A, ASharp, B } from "./piano-sounds"
import {PianoLayer} from "./piano-layer";
import {Piano} from "./piano";

export const runSoundTest = async function runSoundTest() {
  const { Vector2 } = util;

  const inputHandler = new input.Keyboard(window);

  // Could probably do an await all here, but this is easier for now.
let pianoNotes = [
 {pianoKey: "C", keyboardKey: "A", clip: await createSoundClip(C) },
 {pianoKey: "C#", keyboardKey: "W", clip: await createSoundClip(CSharp) },
 {pianoKey: "D", keyboardKey: "S", clip: await createSoundClip(D) },
 {pianoKey: "D#", keyboardKey: "E", clip: await createSoundClip(DSharp) },
 {pianoKey: "E", keyboardKey: "D", clip: await createSoundClip(E) },
 {pianoKey: "F", keyboardKey: "F", clip: await createSoundClip(F) },
 {pianoKey: "F#", keyboardKey: "T", clip: await createSoundClip(FSharp) },
 {pianoKey: "G", keyboardKey: "G", clip: await createSoundClip(G) },
 {pianoKey: "G#", keyboardKey: "Y", clip: await createSoundClip(GSharp) },
 {pianoKey: "A", keyboardKey: "H", clip: await createSoundClip(A) },
 {pianoKey: "A#", keyboardKey: "U", clip: await createSoundClip(ASharp) },
 {pianoKey: "B", keyboardKey: "J", clip: await createSoundClip(B) }
];

  const canvas = document.getElementById("yaboi");

  const width = window.innerWidth;
  const height = window.innerHeight;
  
  canvas.width = width;
  canvas.height = height;

  const entityLibrary = new EntityLibrary();

  const piano = new Piano(new Vector2(100, 50), inputHandler, pianoNotes, entityLibrary);

  let animator = new Animator(
    new Compositor(width, height, canvas, [
      new PianoLayer(width, width, piano, entityLibrary)
    ])
  );
  
  animator.start();
};
