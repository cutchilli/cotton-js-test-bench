import { Entity, EntityLibrary } from 'cotton-js';

export default class SimpleEntity extends Entity {
  constructor(pos, size, entityLibrary = new EntityLibrary(), colour = "green", traits) {
      super(pos, size, entityLibrary, traits, false);
      this.colour = colour;
  }

  update(delta) {
    super.update(delta);
  }

  draw() { 
    const context = this.memoryCanvas.getContext();
    context.fillStyle = this.colour;
    context.fillRect(0, 0, this.size.x, this.size.y);
  }
}
