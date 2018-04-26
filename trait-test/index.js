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

  setPhysicsDefaults(entity) {
    if (!entity.acceleration) {
      entity.acceleration = new util.Point(0, 0)
    };

    if (!entity.velocity) {
      entity.velocity = new util.Point(0, 0)
    };
  }

  update(entity, entityGraph, deltaTime) {
    this.setPhysicsDefaults(entity);
    this.updateX(entity, entityGraph, deltaTime);
    this.updateY(entity, entityGraph, deltaTime);
  }

  updateY(entity, entityGraph, deltaTime) {
    // Update velocity
    entity.velocity.y += deltaTime * entity.acceleration.y;

    // Cap out at terminal velocity if required
    if (this.terminalVelocity && Math.abs(entity.velocity.y) >= Math.abs(this.terminalVelocity.y))
      entity.velocity.y = Math.sign(entity.velocity.y) * this.terminalVelocity.y;

    // Update position
    entity.position.y += deltaTime * entity.velocity.y;
  }

  updateX(entity, entityGraph, deltaTime) {
    // Update velocity
    entity.velocity.x += deltaTime * entity.acceleration.x;

    // Cap out at terminal velocity if required
    if (this.terminalVelocity && Math.abs(entity.velocity.x) >= Math.abs(this.terminalVelocity.x))
      entity.velocity.x = Math.sign(entity.velocity.x) * this.terminalVelocity.x;

    // Update position
    entity.position.x += deltaTime * entity.velocity.x;
  }

  getName() {
    return this.constructor.name;
  }
}

class BoundByPhysicsConstrainedByObstacles extends BoundByPhysics {
  constructor(terminalVelocity) {
    super(terminalVelocity);
  }

  update(entity, entityGraph, deltaTime) {
    const obstacles = entityGraph.getEntitiesByTraitName('Obstacle');

    this.setPhysicsDefaults(entity);

    // Process X
    this.updateX(entity, entityGraph, deltaTime);
    this.applyObstacleCollisionResolutionX(entity, obstacles);
    
    // Process Y
    this.updateY(entity, entityGraph, deltaTime);
    this.applyObstacleCollisionResolutionY(entity, obstacles);
  }

  applyObstacleCollisionResolutionX(entity, obstacles) {
    let xResolution = 0;
    
    obstacles.forEach((obstacle) => {
      if (!util.BoundingBox.overlaps(entity.bounds, obstacle.bounds)) return;

      const sides = util.BoundingBox.getOverlappingSides(entity.bounds, obstacle.bounds);

      // We may have colided with left or right edge
      if (sides.right) {
        // Coming in from the left
        xResolution -= entity.bounds.right - obstacle.bounds.left;
      }

      if (sides.left) {
        // Coming in from the right        
        xResolution += obstacle.bounds.right - entity.bounds.left;
      }
    });

    entity.position.x += xResolution;
  }

  applyObstacleCollisionResolutionY(entity, obstacles) {
    let yResolution = 0;

    obstacles.forEach((obstacle) => {
      if (!util.BoundingBox.overlaps(entity.bounds, obstacle.bounds)) return;

      const sides = util.BoundingBox.getOverlappingSides(entity.bounds, obstacle.bounds);

      // Based on current acceleration, check what needs a tweak
      // We may have colided with top or bottom edge
      if (sides.bottom) {
        // Coming in from the top        
        yResolution -= entity.bounds.bottom - obstacle.bounds.top;
      }

      if (sides.top) {
        // Coming in from the bottom
        yResolution += obstacle.bounds.bottom - entity.bounds.top;
      }
    });

    entity.position.y += yResolution;
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
    new BoundByPhysicsConstrainedByObstacles(new util.Point(120, 120))
  ]));

  entities.push(new Yaboi(startingLoc2, entityGraph, [
    new BoundByGravity(new util.Point(3, -9.8)),
    new BoundByPhysicsConstrainedByObstacles(new util.Point(120, 120))
  ]));

  entities.push(new Yaboi(startingLoc3, entityGraph, [
    new BoundByGravity(new util.Point(9.8, 3)),
    new BoundByPhysicsConstrainedByObstacles(new util.Point(120, 120))
  ]));

  entities.push(new Yaboi(startingLoc4, entityGraph, [
    new BoundByGravity(new util.Point(3, 9.8)),
    new BoundByPhysicsConstrainedByObstacles(new util.Point(120, 120))
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
