import { Animator, Compositor, SpriteSheet, Layer, Entity, EntityLibrary, util, traits, Trait, input } from 'cotton-js';
import atlasSpriteDef from './atlas.json';
import atlasSpriteImageUrl from './atlas.png';
import Cloud from '../common/cloud';
import SimpleEntity from '../common/simple-entity';

const { Obstacle, BoundByGravity, BoundByPhysicsConstrainedByObstacles } = traits;
const { Vector2 } = util;
const { Keyboard } = input;

const rootEl = document.getElementById('yaboi');
const width = window.innerWidth / 3;
const height = window.innerHeight / 3;

class Walks extends Trait {
  constructor(acceleration, deceleration) {
    super();

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

  update(entity, entityLibrary, deltaTime) {
    if (this.isMoving()) {
      // We have a direction input
      entity.velocity.x += this.acceleration * deltaTime * this.direction;
      this.facing = Math.sign(this.direction);
    } else if (entity.velocity.x) {
      // We do not have a direction, therefore we are not moving
      entity.velocity.x = 0;
    }
  }

  getName() {
    return "Walks";
  }
}

class Bruz extends Entity {
  constructor(pos, size, entityLib, spriteSheet) {
    const traits = [
      new BoundByGravity(new Vector2(0, 9.8)),
      new BoundByPhysicsConstrainedByObstacles(new Vector2(120, 120)),
      new Walks(400, 300)
    ];
    
    super(pos, size, entityLib, traits, false);

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
    this.buffer.clear();
    const context = this.buffer.getContext();
    context.drawImage(this.spriteSheet.getSprite(this.currentSprite, this.trait.Walks.facing < 1).getCanvas(), 0, 0);
  }
};

class Ground extends Entity {
  constructor(pos, size, entityLibrary, spriteSheet) {
    const traits = [new Obstacle()];

    super(pos, size, entityLibrary, traits, false);

    // Setup spritesheet info
    this.currentSprite = 'ground';
    this.spriteSheet = spriteSheet;
  }

  draw() {
    this.buffer.clear();
    const context = this.buffer.getContext();
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
    ees.push(new Bruz(new Vector2(0, height - 100), new Vector2(22, 32), eLib, spriteSheet));
  
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
