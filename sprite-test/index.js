import { Animator, Compositor, SpriteSheet, Layer, Entity, EntityLibrary, util, traits } from 'cotton-js';
import atlasSpriteDef from './atlas.json';
import atlasSpriteImageUrl from './atlas.png';
import Cloud from '../common/cloud';
import SimpleEntity from '../common/simple-entity';

const { Obstacle, BoundByGravity, BoundByPhysicsConstrainedByObstacles } = traits;
const { Vector2, getRandomNumber, getRandomInt } = util;

const rootEl = document.getElementById('yaboi');
const width = window.innerWidth;
const height = window.innerHeight;

class Ground extends SimpleEntity {
  constructor(pos, entityLibrary, groundTileSize, colour) {
    super(
      pos,
      new Vector2(groundTileSize, groundTileSize),
      entityLibrary,
      colour,
      [new Obstacle()]
    );
  }
}

function createGround(groundTileSize, entityLibrary, colour) {
  const entities = [];

  let x = 0;
  let y = height - groundTileSize;

  while(x < width) {
    entities.push(new Ground(new Vector2(x, y), entityLibrary, 10, colour));
    x += groundTileSize;
  }

  return entities;
};

class Bruz extends Entity {
  constructor(spriteSheet, pos, size, entityLib, traits) {
    super(pos, size, entityLib, traits, false);
    this.spriteSheet = spriteSheet;
    this.frameNum = 1;
    this.frame = () => `idle${this.frameNum}`; 
  }

  update(delta) {
    super.update(delta);
  }

  draw() {
    this.buffer.clear();
    const context = this.buffer.getContext();
    context.drawImage(this.spriteSheet.getSprite(`${this.frame()}`).getCanvas(), 0, 0);
  }
};

export const runtSpriteTest = function runtSpriteTest() {
  const img = new Image();
  img.onload = () => {
    const spriteSheet = SpriteSheet.createSpriteSheet(atlasSpriteDef, img);

    let ees = [];

    const eLib = new EntityLibrary()
    
    ees = createGround(10, eLib, 'red');
    ees.push(new Bruz(spriteSheet, new Vector2(width/2, height/2), new Vector2(22, 32), eLib, [
      new BoundByGravity(new Vector2(0, 9.8)),
      new BoundByPhysicsConstrainedByObstacles(new Vector2(120, 120)),
    ]));

    let animator = new Animator(
      new Compositor(
          width,
          height,
          rootEl,
          [new Cloud(width, height), new Layer(width, height, eLib, ees)],
      )
    );

    animator.start();
  };

  img.src = atlasSpriteImageUrl;
};
