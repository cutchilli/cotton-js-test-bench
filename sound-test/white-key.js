import { Entity, util } from "cotton-js";

const {Vector2} = util;

export class WhiteKey extends Entity {
  constructor(pos, size, keyboardKey, entityLibrary, traits) {
    super(pos, size, entityLibrary, traits);

    this.keyboardKey = keyboardKey;
    this.highlightOpacity = 0.0;
  }

  draw() {
    const context = this.memoryCanvas.getContext();
    this.memoryCanvas.clear();

    context.beginPath();
    context.strokeStyle = 'black';
    context.rect(0, 0, this.size.x, this.size.y);
    context.stroke();

    context.globalAlpha = this.highlightOpacity;
    context.fillStyle = "blue";
    context.fillRect(0, 0, this.size.x, this.size.y);
    context.globalAlpha = 1.0;

    context.fillStyle = 'black';
    context.font = '30px arial';
    context.textAlign = "center";
    context.fillText(this.keyboardKey, this.size.x / 2, this.size.y * 0.9);
  }

  update(deltaTime) {
    super.update(deltaTime);

    if (this.trait.PlaysKey.isPlaying()) {
      this.highlightOpacity = 0.5;
    }

    if (this.highlightOpacity > 0) {
      this.highlightOpacity = this.highlightOpacity - 0.075;
    }

    if (this.highlightOpacity < 0) {
      this.highlightOpacity = 0.0;
    }
  }
}