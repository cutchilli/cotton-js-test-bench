import { Entity, util } from "cotton-js";


export class BlackKey extends Entity {
  constructor(pos, size, keyboardKey, entityLibrary) {
    super(pos, size, entityLibrary);

    this.keyboardKey = keyboardKey;
  }

  draw() {
    const context = this.memoryCanvas.getContext();

    context.fillStyle = 'black';
    context.fillRect(0, 0, this.size.x, this.size.y);

    context.fillStyle = 'white';
    context.font = '30px arial';
    context.textAlign = "center";
    context.fillText(this.keyboardKey, this.size.x / 2, this.size.y * 0.9);
  }

  update(deltaTime) {
    super.update(deltaTime);
  }
}