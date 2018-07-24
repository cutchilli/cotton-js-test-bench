import {
  Animator,
  Compositor,
  Layer,
  PolygonEntity,
  EntityLibrary,
  util,
  Trait,
  traits,
  input,
  detectCollisionsSAT,
  CircleEntity,
} from 'cotton-js';

const { Mouse, MOVE } = input;
const { Obstacle } = traits;
const { Vector2, Polygon, Circle } = util;

class Collidable extends Trait {
  constructor(entity) {
    super(entity);
  }

  update(deltaTime) {
    this.resolveCollisions();
  }

  resolveCollisions() {
    const collisionStrategy = detectCollisionsSAT;
    const collisions = collisionStrategy(this.entity, ['Obstacle']);

    if (!collisions || !collisions.length) return;

    collisions.forEach((collision) => {
      console.log(`OverlapX=${collision.response.overlapV.x} OverlapY=${collision.response.overlapV.y}`);
      this.entity.position.x -= collision.response.overlapV.x;
      this.entity.position.y -= collision.response.overlapV.y;
    });
  }
}

export class SimpleCircleEntity extends CircleEntity {
  constructor(pos, entityLibrary, radius) {
    super(pos, radius, entityLibrary, [], true);
  }

  draw() {
    return;
  }
}

export class SimplePolygonEntity extends PolygonEntity {
  constructor(pos, entityLibrary, shape) {
    super(pos, shape, entityLibrary, [], true);
  }

  draw() {
    return;
  }
}

const rootEl = document.getElementById('yaboi');
const width = window.innerWidth;
const height = window.innerHeight;

export const runSatTest = function runSatTest() {
  // Create and show a polygon shape
  const entityLibrary = new EntityLibrary();

  const entities = [];

  const daBoi = new SimplePolygonEntity(new Vector2(50, 50), entityLibrary, new Polygon([
    new Vector2(0, 0),
    new Vector2(30, 0),
    new Vector2(0, 30),
  ]));
  daBoi.addTraits([new Collidable(daBoi)]);

  const obstacle = new SimplePolygonEntity(new Vector2(370, 370), entityLibrary, new Polygon([
    new Vector2(15, 5),
    new Vector2(100, 50),
    new Vector2(50, 100),
    new Vector2(10, 90),
  ]));
  obstacle.addTraits([new Obstacle()]);

  const obstacle2 = new SimpleCircleEntity(new Vector2(200, 500), entityLibrary, 50);
  obstacle2.addTraits([new Obstacle()]);

  const mouse = new Mouse(document.documentElement);
  mouse.addMapping(MOVE, ({ pointerPosition }) => {
    daBoi.position.set(pointerPosition.x, pointerPosition.y);
  });

  entities.push(
    daBoi,
    obstacle,
    obstacle2,
  );

  let animator = new Animator(
    new Compositor(
      width,
      height,
      rootEl,
      [new Layer(width, height, entityLibrary, entities)]
    )
  );

  animator.start();
};
