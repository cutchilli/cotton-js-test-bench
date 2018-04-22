import { Entity } from 'cotton-js';
import { EntityGraph } from 'cotton-js';

export default class SimpleEntity extends Entity {
  constructor(pos, vel, size, entityGraph = new EntityGraph()) {
      super(pos, vel, size, entityGraph, [], true);
  }

  // do nothing. We just want to see a box
  draw() { }
}