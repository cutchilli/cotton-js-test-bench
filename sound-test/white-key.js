import { Entity, util } from "cotton-js";

const {Vector2} = util;

export class WhiteKey extends Entity {
  constructor(pos, size, keyboardKey, entityLibrary) {
    super(pos, size, entityLibrary);

    this.keyboardKey = keyboardKey;
  }

  draw() {
    const context = this.buffer.getContext();

    context.beginPath();
    context.strokeStyle = 'black';
    context.rect(0, 0, this.size.x, this.size.y);
    context.stroke();

    context.fillStyle = 'black';
    context.font = '30px arial';
    context.textAlign = "center";
    context.fillText(this.keyboardKey, this.size.x / 2, this.size.y * 0.9);
  }

  update(deltaTime) {
    super.update(deltaTime);
  }
}