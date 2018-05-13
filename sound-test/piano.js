import { Entity, util } from "cotton-js";
import { WhiteKey } from "./white-key";
import { BlackKey } from "./black-key";

const {Vector2} = util;

export class Piano extends Entity {
  constructor(pos, pianoNotes, entityLibrary) {
    let whiteKeys = [];
    let blackKeys = [];

    let whiteKeySize = new Vector2(100, 300);
    let blackKeySize = new Vector2(whiteKeySize.x / 2, whiteKeySize.y / 2);

    let i = 0;
    let WhiteKeyLastEndPos = 0;


    for (let pianoNote of pianoNotes) {
      if (pianoNote.pianoKey.includes("#")) {
        blackKeys.push(new BlackKey(
          new Vector2(
            WhiteKeyLastEndPos - (blackKeySize.x / 2), 0), 
            blackKeySize, 
            pianoNote.keyboardKey, 
            entityLibrary)
          );
        continue;
      }

      whiteKeys.push(new WhiteKey(
        new Vector2(WhiteKeyLastEndPos, 0), 
        whiteKeySize, 
        pianoNote.keyboardKey,
        entityLibrary)
      );
      WhiteKeyLastEndPos += whiteKeySize.x;
    }

    super(pos, new Vector2(WhiteKeyLastEndPos, whiteKeySize.y), entityLibrary);

    this.whiteKeys = whiteKeys;
    this.blackKeys = blackKeys;
  }

  draw() {
    let context = this.buffer.getContext();

    for (let whiteKey of this.whiteKeys) {
      whiteKey.paintOn(context);
    }

    for (let blackKey of this.blackKeys) {
      blackKey.paintOn(context);
    }
  }

  update(deltaTime) {
    super.update(deltaTime);
  }
}