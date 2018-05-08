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
const img = new Image();

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
    entities.push(new Ground(new Vector2(x, y), entityLibrary, groundTileSize, colour));
    x += groundTileSize;
  }

  return entities;
};

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
  constructor(pos, size, entityLib) {
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
    this.spriteSheet = SpriteSheet.createSpriteSheet(atlasSpriteDef, img);   
    this.currentSprite = 'idle1';
  }

  update(delta) {
    super.update(delta);

    // Animate me
    const previousSprite = this.currentSprite;

    if (this.trait.Walks.isMoving()) {
      this.currentSprite = this.spriteSheet.getSpriteForAnimation('run', this.lifetime, this.trait.Walks.facing < 1);
    } else {
      this.currentSprite = this.spriteSheet.getSpriteForAnimation('idle', this.lifetime, this.trait.Walks.facing < 1);
    }

    if (previousSprite !== this.currentSprite) this.draw();
  }

  draw() {
    this.buffer.clear();
    const context = this.buffer.getContext();
    context.drawImage(this.spriteSheet.getSprite(this.currentSprite).getCanvas(), 0, 0);
  }
};

export const runtSpriteTest = function runtSpriteTest() {  
  img.onload = () => {
    let ees = [];

    const eLib = new EntityLibrary()
    
    ees = createGround(20, eLib, 'red');
    ees.push(new Bruz(new Vector2(width/2, height/2), new Vector2(22, 32), eLib));

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
