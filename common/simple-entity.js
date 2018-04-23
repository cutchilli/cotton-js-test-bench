import { Entity, EntityGraph } from 'cotton-js';

export default class SimpleEntity extends Entity {
  constructor(pos, size, entityGraph = new EntityGraph(), colour = "green", traits) {
      super(pos, size, entityGraph, traits, true);
      this.colour = colour;
  }

  draw() { 
    const context = this.buffer.getContext();
    context.fillStyle = this.colour;
    context.fillRect(0, 0, this.size.x, this.size.y);
  }
}
