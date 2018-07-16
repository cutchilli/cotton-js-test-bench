import {
  Animator,
  Compositor,
  Layer,
  PolygonEntity,
  EntityLibrary,
  util,
  traits,
  input,
} from 'cotton-js';
import SimpleEntity from '../common/simple-entity';

const { Mouse, MOVE } = input;
const { Obstacle } = traits;
const { Vector2, Polygon } = util;

export default class SimplePolygonEntity extends PolygonEntity {
  constructor(pos, entityLibrary, traits) {
    super(pos, new Polygon(
      [new Vector2(100, 50), new Vector2(50, 100), new Vector2(0, 90)]
    ), entityLibrary, traits, true);
  }

  draw() {
    return;
  }
}

class Block extends SimpleEntity {
  constructor(pos, entityLibrary) {
    super(
      pos,
      new Vector2(50, 50),
      entityLibrary,
      'black',
      [new Obstacle()]
    );
  }
}

const rootEl = document.getElementById('yaboi');
const width = window.innerWidth;
const height = window.innerHeight;

export const runSatTest = function runSatTest() {
  // Create and show a polygon shape
  const entityLibrary = new EntityLibrary();

  const entities = [];

  const daBoi = new SimplePolygonEntity(new Vector2(50, 50), entityLibrary, []);

  const mouse = new Mouse(document.documentElement);
  mouse.addMapping(MOVE, ({ pointerPosition }) => {
    daBoi.position.set(pointerPosition.x, pointerPosition.y);
  });

  entities.push(
    daBoi,
    new Block(new Vector2(370, 370), entityLibrary),
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
