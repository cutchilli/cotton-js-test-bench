import { Trait } from "cotton-js";


export class PlaysKey extends Trait {
  constructor(inputHandler, pianoNote) {
    super();
    
    inputHandler.addMapping("Key" + pianoNote.keyboardKey, (keyState) => {
      if (keyState === 1) {
        pianoNote.clip.play();
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