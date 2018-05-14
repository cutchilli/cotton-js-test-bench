import { Trait } from "cotton-js";


export class PlaysKey extends Trait {
  constructor(inputHandler, audio, pianoNote) {
    super();

    const clip = audio.createSoundClip(pianoNote.url);

    inputHandler.addMapping("Key" + pianoNote.keyboardKey, (keyState) => {
      if (keyState === 1) {
        clip.play();
        this.playing = true;
      }
    });

    this.playing = false;
  } 

  isPlaying() {
    let isPlaying = this.playing;
    this.playing = false;
    return isPlaying;
  }

  update(entity, entityLibrary, deltaTime) {
    return;
  }

  getName() {
    return "PlaysKey";
  }
}