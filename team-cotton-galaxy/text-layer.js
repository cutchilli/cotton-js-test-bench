import { Layer, util, EntityLibrary } from "cotton-js";

import Letter from "./letter";
import letters from "./letters";

const { Vector2 } = util;

const createText = (maxWidth, maxHeight, str, yOffset, entityLibrary) => {
  const strUppered = str.toUpperCase();
  const retVal = [];

  let currX = 0;
  for (let i = 0; i < strUppered.length; i += 1) {
    const char = strUppered.charAt(i);
    const letterMatrix = letters[char];

    var letter = new Letter(
      maxWidth,
      maxHeight,
      new Vector2(currX, yOffset),
      letterMatrix,
      entityLibrary
    );
    retVal.push(letter);

    let maxLength = 0;

    letterMatrix.forEach(mat => {
      if (mat.length > maxLength) maxLength = mat.length;
    });

    currX += maxLength * (letter.blockSize.x + 1);
  }

  return retVal;
};

export default class TextLayer extends Layer {
  constructor(width, height, textToDisplay, yOffset = 0) {
    super(width, height, new EntityLibrary());

    this.addEntities(createText(width, height, textToDisplay, yOffset, this.entityLibrary));
  }
}
