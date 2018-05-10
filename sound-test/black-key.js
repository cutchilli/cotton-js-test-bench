import { Entity, util } from "cotton-js";


export class BlackKey extends Entity {
  constructor(pos, size, entityLibrary) {

    super(pos, size, entityLibrary);
  }

  draw() {
    const context = this.buffer.getContext();

    context.beginPath();
    context.strokeStyle = 'black';
    context.fillRect(0, 0, this.size.x, this.size.y);
    context.stroke();
  }

  update(deltaTime) {
    super.update(deltaTime);
  }
}