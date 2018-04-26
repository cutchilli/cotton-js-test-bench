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
    if (!entity.acceleration) {
      entity.acceleration = new util.Point(0, 0)
    };

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
    if (!entity.acceleration) {
      entity.acceleration = new util.Point(0, 0)
    };

    if (!entity.velocity) {
      entity.velocity = new util.Point(0, 0)
    };

    // Update velocity
    entity.velocity.x += deltaTime * entity.acceleration.x;
    entity.velocity.y += deltaTime * entity.acceleration.y;

    // Cap out at terminal velocity if required
    if (Math.abs(entity.velocity.x) >= Math.abs(this.terminalVelocity.x))
      entity.velocity.x = Math.sign(entity.velocity.x) * this.terminalVelocity.x;
    if (Math.abs(entity.velocity.y) >= Math.abs(this.terminalVelocity.y))
      entity.velocity.y = Math.sign(entity.velocity.y) * this.terminalVelocity.y;

    const obstacles = entityGraph.getEntitiesByTraitName('Obstacle');

    // Update position
    entity.position.x += deltaTime * entity.velocity.x;
    entity.position.x += this.detectCollisionsX(entity, obstacles);
    entity.position.y += deltaTime * entity.velocity.y;
    entity.position.y += this.detectCollisionsY(entity, obstacles);
  }

  detectCollisionsX(entity, obstacles) {
    let xResolution = 0;
    
    obstacles.forEach((obstacle) => {
      if (!util.BoundingBox.overlaps(entity.bounds, obstacle.bounds)) return;

      const sides = util.BoundingBox.getOverlappingSides(entity.bounds, obstacle.bounds);

      // We may have colided with left or right edge
      if (sides.right) {
        xResolution -= entity.bounds.right - obstacle.bounds.left;
        // Coming in from the left
        console.log('left');
        // return;
      }

      if (sides.left) {
        xResolution += obstacle.bounds.right - entity.bounds.left;
        // Coming in from the right
        console.log('right');
        // return;
      }
    });

    return xResolution;
  }

  detectCollisionsY(entity, obstacles) {
    let yResolution = 0;

    obstacles.forEach((obstacle) => {
      if (!util.BoundingBox.overlaps(entity.bounds, obstacle.bounds)) return;

      const sides = util.BoundingBox.getOverlappingSides(entity.bounds, obstacle.bounds);

      // Based on current acceleration, check what needs a tweak
      // We may have colided with top or bottom edge
      if (sides.bottom) {
        yResolution -= entity.bounds.bottom - obstacle.bounds.top;
        // Coming in from the top
        console.log('bottom');
        // return;
      }

      if (sides.top) {
        yResolution += obstacle.bounds.bottom - entity.bounds.top;
        // Coming in from the bottom
        console.log('top');
        // return;
      }
    });

    return yResolution;
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

class ConstrainedByObstacles extends Trait {
  getName() {
    return this.constructor.name;
  }
}

class Block extends SimpleEntity {
  constructor(pos, entityGraph) {
    super(
      pos,
      new util.Point(50, 50),
      entityGraph,
      'red',
      [new Obstacle()]
    );
  }
}

class Yaboi extends SimpleEntity {
  constructor(pos, entityGraph, traits) {
    super(
      pos,
      new util.Point(20, 20),
      entityGraph,
      'cyan',
      traits
    );
  }
}

export const runTraitTest = function runTraitTest() {
  
  const entityGraph = new EntityGraph();

  const entities = [];

  // Create the floor
  let x = 0;
  let y = height - 50;

  while (x < width) {
    entities.push(new Block(new util.Point(x, y), entityGraph));
    x += 50;
  }

  // Create the roof
  x = 0;
  y = 0;

  while (x < width) {
    entities.push(new Block(new util.Point(x, y), entityGraph));
    x += 50;
  }

  // Create left wall
  x = 0;
  y = 0;

  while (y < height) {
    entities.push(new Block(new util.Point(x, y), entityGraph));
    y += 50;
  }

  // Create right wall
  x = width - 50;
  y = 0;

  while (y < height) {
    entities.push(new Block(new util.Point(x, y), entityGraph));
    y += 50;
  }

  // Create the movable entity
  const startingLoc1 = new util.Point(width/2, height/2);
  const startingLoc2 = new util.Point(width/2, height/2);
  const startingLoc3 = new util.Point(width/2, height/2);
  const startingLoc4 = new util.Point(width/2, height/2);

  entities.push(new Yaboi(startingLoc1, entityGraph, [
    new BoundByGravity(new util.Point(-9.8, 3)),
    new BoundByPhysics(new util.Point(120, 120)),
    new ConstrainedByObstacles()
  ]));

  entities.push(new Yaboi(startingLoc2, entityGraph, [
    new BoundByGravity(new util.Point(3, -9.8)),
    new BoundByPhysics(new util.Point(120, 120)),
    new ConstrainedByObstacles()
  ]));

  entities.push(new Yaboi(startingLoc3, entityGraph, [
    new BoundByGravity(new util.Point(9.8, 3)),
    new BoundByPhysics(new util.Point(120, 120)),
    new ConstrainedByObstacles()
  ]));

  entities.push(new Yaboi(startingLoc4, entityGraph, [
    new BoundByGravity(new util.Point(3, 9.8)),
    new BoundByPhysics(new util.Point(120, 120)),
    new ConstrainedByObstacles(),
  ]));

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
