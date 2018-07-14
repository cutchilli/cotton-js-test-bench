import { Animator, Compositor, createSoundClip, Mixer, Track, Reverb, browserSpeaker, input, EntityLibrary, util } from "cotton-js";
import { C, CSharp, D, DSharp, E, F, FSharp, G, GSharp, A, ASharp, B } from "./piano-sounds"
import {PianoLayer} from "./piano-layer";
import {Piano} from "./piano";

const mixer = new Mixer();
const reverb = new Reverb(2, 2);
reverb.setDryWet(1);

mixer.getMaster().addEffects([reverb]);
mixer.connectTo(browserSpeaker);

async function createClipInMixer(clipUrl, trackname) {
  const track = new Track();
   var clip = await createSoundClip(clipUrl, false);

  clip.connectTo(track);
  mixer.setTrack(track, trackname);

  return clip;
}

export const runSoundTest = async function runSoundTest() {
  const { Vector2 } = util;

  const inputHandler = new input.Keyboard(window);

  // Could probably do an await all here, but this is easier for now.
let pianoNotes = [
 {pianoKey: "C", keyboardKey: "A", clip: await createClipInMixer(C, "C") },
 {pianoKey: "C#", keyboardKey: "W", clip: await createClipInMixer(CSharp, "C#") },
 {pianoKey: "D", keyboardKey: "S", clip: await createClipInMixer(D, "D") },
 {pianoKey: "D#", keyboardKey: "E", clip: await createClipInMixer(DSharp, "D#") },
 {pianoKey: "E", keyboardKey: "D", clip: await createClipInMixer(E, "E#") },
 {pianoKey: "F", keyboardKey: "F", clip: await createClipInMixer(F, "F") },
 {pianoKey: "F#", keyboardKey: "T", clip: await createClipInMixer(FSharp, "F#") },
 {pianoKey: "G", keyboardKey: "G", clip: await createClipInMixer(G, "G") },
 {pianoKey: "G#", keyboardKey: "Y", clip: await createClipInMixer(GSharp, "G#") },
 {pianoKey: "A", keyboardKey: "H", clip: await createClipInMixer(A, "A") },
 {pianoKey: "A#", keyboardKey: "U", clip: await createClipInMixer(ASharp, "A#") },
 {pianoKey: "B", keyboardKey: "J", clip: await createClipInMixer(B, "B") }
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
