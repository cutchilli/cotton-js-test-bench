import { Entity, util } from "cotton-js";
import { WhiteKey } from "./white-key";
import { BlackKey } from "./black-key";
import { PlaysKey } from "./plays-key";
const {Vector2} = util;

export class Piano extends Entity {
  constructor(pos, inputHandler, pianoNotes, entityLibrary) {
    let whiteKeys = [];
    let blackKeys = [];

    let whiteKeySize = new Vector2(100, 300);
    let blackKeySize = new Vector2(whiteKeySize.x / 2, whiteKeySize.y / 2);

    let i = 0;
    let WhiteKeyLastEndPos = 0;

    for (let pianoNote of pianoNotes) {
      const blackKeyPosition =  new Vector2(
        WhiteKeyLastEndPos - (blackKeySize.x / 2), 0);

      if (pianoNote.pianoKey.includes("#")) {
        const blackKey = new BlackKey(
            blackKeyPosition, 
            blackKeySize, 
            pianoNote.keyboardKey, 
            entityLibrary, 
            [new PlaysKey(inputHandler, pianoNote)]
        );
        blackKeys.push(blackKey);
        continue;
      }

      const whiteKeyPosition = new Vector2(WhiteKeyLastEndPos, 0);

      const whiteKey = new WhiteKey(
        whiteKeyPosition, 
        whiteKeySize, 
        pianoNote.keyboardKey,
        entityLibrary,
        [new PlaysKey(inputHandler, pianoNote)]
      );

      whiteKeys.push(whiteKey);
      WhiteKeyLastEndPos += whiteKeySize.x;
    }

    super(pos, new Vector2(WhiteKeyLastEndPos, whiteKeySize.y), entityLibrary);

    this.whiteKeys = whiteKeys;
    this.blackKeys = blackKeys;
  }

  draw() { 
    //This is wrong. Fix this.
    this.memoryCanvas.clear(); 

    let context = this.memoryCanvas.getContext();

    for (let whiteKey of this.whiteKeys) {
      whiteKey.draw();
      whiteKey.paintOn(context);
    }

    for (let blackKey of this.blackKeys) {
      blackKey.draw();
      blackKey.paintOn(context);
    }
  }

  update(deltaTime) {
    super.update(deltaTime);

    for (let whiteKey of this.whiteKeys) {
      whiteKey.update(deltaTime);
    }

    for (let blackKey of this.blackKeys) {
      blackKey.update(deltaTime);
    }

    this.draw();
  }
}