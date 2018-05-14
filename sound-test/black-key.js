import { Entity, util } from "cotton-js";


export class BlackKey extends Entity {
  constructor(pos, size, keyboardKey, entityLibrary, traits) {
    super(pos, size, entityLibrary, traits);

    this.keyboardKey = keyboardKey;
    this.highlightOpacity = 0.0;
  }

  draw() {
    const context = this.memoryCanvas.getContext();

    context.fillStyle = 'black';
    context.fillRect(0, 0, this.size.x, this.size.y);

    context.globalAlpha = this.highlightOpacity;
    context.fillStyle = "blue";
    context.fillRect(0, 0, this.size.x, this.size.y);
    context.globalAlpha = 1.0;

    context.fillStyle = 'white';
    context.font = '30px arial';
    context.textAlign = "center";
    context.fillText(this.keyboardKey, this.size.x / 2, this.size.y * 0.9);
  }

  update(deltaTime) {
    super.update(deltaTime);

    if (this.trait.PlaysKey.isPlaying()) {
      this.highlightOpacity = 1;
    }

    if (this.highlightOpacity > 0) {
      this.highlightOpacity = this.highlightOpacity - 0.075;
    }

    if (this.highlightOpacity < 0) {
      this.highlightOpacity = 0.0;
    }
  }
}