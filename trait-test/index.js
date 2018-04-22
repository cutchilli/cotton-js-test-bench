import Cloud from "../common/cloud";
import SimpleEntity from "../common/simple-entity";
import { Animator, Compositor, Layer, Entity, EntityGraph, Trait, util } from "cotton-js";

const rootEl = document.getElementById('yaboi');
const width = window.innerWidth;
const height = window.innerHeight;

class BoundByGravity extends Trait {
  constructor(acceleration) {
    super();
    this.acceleration = acceleration;
  }

  update(entity, entityGraph, deltaTime) {    
    entity.acceleration.y = this.acceleration.y;
    entity.acceleration.x = this.acceleration.x;
  }

  getName() {
    return this.constructor.name;;
  }
}

class BoundByPhysics extends Trait {
  constructor(terminalVelocity) {
    super();
    this.terminalVelocity = terminalVelocity;
  }
  update(entity, entityGraph, deltaTime) {
    // Update velocity
    entity.velocity.x += deltaTime * entity.acceleration.x;
    entity.velocity.y += deltaTime * entity.acceleration.y;

    // Cap out terminal velocity if required
    if (Math.abs(entity.velocity.x) >= Math.abs(this.terminalVelocity.x)) entity.velocity.x = Math.sign(entity.velocity.x) * this.terminalVelocity.x;
    if (Math.abs(entity.velocity.y) >= Math.abs(this.terminalVelocity.y)) entity.velocity.y = Math.sign(entity.velocity.y) * this.terminalVelocity.y;

    // Update position
    entity.position.x += deltaTime * entity.velocity.x;
    entity.position.y += deltaTime * entity.velocity.y;
  }

  getName() {
    return this.constructor.name;
  }
}

class Obstacle extends Trait {
  getName() {
    return this.constructor.name;
  }
}

class Block extends SimpleEntity {
  constructor(pos, entityGraph) {
    super(
      pos,
      new util.Point(0, 0),
      new util.Point(50, 50),
      entityGraph,
      'red',
      [new Obstacle()]
    );
  }
}

// class Yaboi extends SimpleEntity {
//   constructor(pos, entityGraph) {

//   }
// }

export const runTraitTest = function runTraitTest() {
  
  const entityGraph = new EntityGraph();

  // Create the traits, these will be the "rules" of the game  

  const entities = [];

  // Create the floor
  let x = 0;
  let y = height - 50;

  while (x < width) {
    entities.push(new Block(new util.Point(x, y), entityGraph));
    x += 50;
  }

  // Create the movable entity

  let animator = new Animator(
      new Compositor(
          width,
          height,
          rootEl,
          [new Layer(width, height, new EntityGraph(), entities)],
      )
  );

  animator.start();
};
