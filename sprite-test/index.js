import { Animator, Compositor, SpriteSheet, Layer, RectangleEntity, EntityLibrary, util, traits, Trait, input } from 'cotton-js';
import atlasSpriteDef from './atlas.json';
import atlasSpriteImageUrl from './atlas.png';
import Cloud from '../common/cloud';

const { Obstacle, BoundByGravity, BoundByPhysicsConstrainedByObstacles } = traits;
const { Vector2 } = util;
const { Keyboard } = input;

const rootEl = document.getElementById('yaboi');
const width = window.innerWidth / 3;
const height = window.innerHeight / 3;

class Walks extends Trait {
  constructor(entity, acceleration, deceleration) {
    super(entity);

    this.acceleration = acceleration;
    this.deceleration = deceleration;
    this.direction = 0;
    this.facing = 1;
  }

  isMoving() {
    return !!this.direction;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  update(deltaTime) {
    if (this.isMoving()) {
      // We have a direction input
      this.entity.velocity.x += this.acceleration * deltaTime * this.direction;
      this.facing = Math.sign(this.direction);
    } else if (this.entity.velocity.x) {
      // We do not have a direction, therefore we are not moving
      this.entity.velocity.x = 0;
    }
  }

  getName() {
    return "Walks";
  }
}

class Bruz extends RectangleEntity {
  constructor(pos, size, entityLib, spriteSheet) {
    super(pos, size, entityLib);

    const traits = [
      new BoundByGravity(this, new Vector2(0, 9.8)),
      new BoundByPhysicsConstrainedByObstacles(this, new Vector2(120, 120)),
      new Walks(this, 400, 300)
    ];

    this.addTraits(traits);

    // Setup input handling
    const keyboard = new Keyboard(window);
    keyboard.addMapping('ArrowLeft', (keystate) => this.trait.Walks.setDirection(-keystate));
    keyboard.addMapping('ArrowRight', (keystate) => this.trait.Walks.setDirection(keystate));

    // Setup sprites
    this.spriteSheet = spriteSheet;
    this.currentSprite = 'idle1';
  }

  update(delta) {
    super.update(delta);

    // Animate me
    const previousSprite = this.currentSprite;

    if (this.trait.Walks.isMoving()) {
      this.currentSprite = this.spriteSheet.getSpriteForAnimation('run', this.lifetime);
    } else {
      this.currentSprite = this.spriteSheet.getSpriteForAnimation('idle', this.lifetime);
    }

    if (previousSprite !== this.currentSprite) this.draw();
  }

  draw() {
    this.memoryCanvas.clear();
    const context = this.memoryCanvas.getContext();
    context.drawImage(this.spriteSheet.getSprite(this.currentSprite, this.trait.Walks.facing < 1).getCanvas(), 0, 0);
  }
};

class Ground extends RectangleEntity {
  constructor(pos, size, entityLibrary, spriteSheet) {
    const traits = [new Obstacle()];

    super(pos, size, entityLibrary, traits, false);

    // Setup spritesheet info
    this.currentSprite = 'ground';
    this.spriteSheet = spriteSheet;
  }

  draw() {
    this.memoryCanvas.clear();
    const context = this.memoryCanvas.getContext();
    context.drawImage(this.spriteSheet.getSprite(this.currentSprite).getCanvas(), 0, 0);
  }
}

function createGround(groundTileSize, entityLibrary, spriteSheet) {
  const entities = [];

  let x = 0;
  let y = height - groundTileSize;

  while(x < width) {
    entities.push(new Ground(new Vector2(x, y), new Vector2(groundTileSize, groundTileSize), entityLibrary, spriteSheet));
    x += groundTileSize;
  }

  return entities;
};

export const runtSpriteTest = function runtSpriteTest() {
  // setup sprites
  const img = new Image();
  img.onload = () => {
    const spriteSheet = SpriteSheet.createSpriteSheet(atlasSpriteDef, img);

    let ees = [];

    const eLib = new EntityLibrary()

    ees = createGround(20, eLib, spriteSheet);
    ees.push(new Bruz(new Vector2(0, 0), new Vector2(22, 32), eLib, spriteSheet));

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
