import { Animator, Compositor, Audio, input, EntityLibrary, util } from "cotton-js";
import { C, CSharp, D, DSharp, E, F, FSharp, G, GSharp, A, ASharp, B } from "./piano-sounds"
import {PianoLayer} from "./piano-layer";
import {Piano} from "./piano";

export const runSoundTest = function runSoundTest() {
  const { Vector2 } = util;

  var audio = new Audio();
  const inputHandler = new input.Keyboard(window);

let pianoNotes = [
 {pianoKey: "C", keyboardKey: "A", url: C },
 {pianoKey: "C#", keyboardKey: "W", url: CSharp },
 {pianoKey: "D", keyboardKey: "S", url: D },
 {pianoKey: "D#", keyboardKey: "E", url: DSharp },
 {pianoKey: "E", keyboardKey: "D", url: E },
 {pianoKey: "F", keyboardKey: "F", url: F },
 {pianoKey: "F#", keyboardKey: "T", url: FSharp },
 {pianoKey: "G", keyboardKey: "G", url: G },
 {pianoKey: "G#", keyboardKey: "Y", url: GSharp },
 {pianoKey: "A", keyboardKey: "H", url: A },
 {pianoKey: "A#", keyboardKey: "U", url: ASharp },
 {pianoKey: "B", keyboardKey: "J", url: B }
];

  const canvas = document.getElementById("yaboi");

  const width = window.innerWidth;
  const height = window.innerHeight;
  
  canvas.width = width;
  canvas.height = height;

  const entityLibrary = new EntityLibrary();

  const piano = new Piano(new Vector2(100, 50), inputHandler, audio, pianoNotes, entityLibrary);

  let animator = new Animator(
    new Compositor(width, height, canvas, [
      new PianoLayer(width, width, piano, entityLibrary)
    ])
  );
  
  animator.start();
};
