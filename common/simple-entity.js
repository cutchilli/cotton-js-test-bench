import { Entity } from 'cotton-js';
import { EntityGraph } from 'cotton-js';

export default class SimpleEntity extends Entity {
  constructor(pos, vel, size, entityGraph = new EntityGraph(), colour = "green") {
      super(pos, vel, size, entityGraph, [], true);
      this.colour = colour;
  }

  draw() { 
    const context = this.buffer.getContext();

    context.fillStyle = this.colour;
    super.draw();
  }
}