import Cloud from "../common/cloud";
import SimpleEntity from "../common/simple-entity";
import { Animator, Compositor, Layer, Entity, EntityLibrary, Trait, util, traits } from "cotton-js";

const { Obstacle, BoundByGravity, BoundByPhysicsConstrainedByObstacles } = traits;
const { Vector2, getRandomNumber, getRandomInt } = util;

const rootEl = document.getElementById('yaboi');
const width = window.innerWidth;
const height = window.innerHeight;

const getRandomColour = () => {
  const colours = ["225,247,213", "255,189,189", "201,201,255", "241,203,255"];

  return colours[Math.floor(Math.random() * colours.length)];
};

class Block extends SimpleEntity {
  constructor(pos, entityLibrary) {
    super(
      pos,
      new Vector2(50, 50),
      entityLibrary,
      'white',
      [new Obstacle()]
    );
  }
}

class Yaboi extends SimpleEntity {
  constructor(pos, entityLibrary, traits) {
    super(
      pos,
      new Vector2(20, 20),
      entityLibrary,
      `rgba(${getRandomColour()}, ${getRandomInt(50, 100)})`,
      traits
    );
  }
}

export const runTraitTest = function runTraitTest() {
  
  const entityLibrary = new EntityLibrary();

  const entities = [];

  // Create the floor
  let x = 0;
  let y = height - 50;

  while (x < width) {
    entities.push(new Block(new Vector2(x, y), entityLibrary));
    x += 50;
  }

  // Create the roof
  x = 0;
  y = 0;

  while (x < width) {
    entities.push(new Block(new Vector2(x, y), entityLibrary));
    x += 50;
  }

  // Create left wall
  x = 0;
  y = 0;

  while (y < height) {
    entities.push(new Block(new Vector2(x, y), entityLibrary));
    y += 50;
  }

  // Create right wall
  x = width - 50;
  y = 0;

  while (y < height) {
    entities.push(new Block(new Vector2(x, y), entityLibrary));
    y += 50;
  }

  for (let i = 0; i < 150; i += 1) {
    entities.push(
      new Yaboi(
          new Vector2(width/2, height/2), 
          entityLibrary, [
            new BoundByGravity(new Vector2(getRandomNumber(-30, 30), getRandomNumber(-30, 30))),
            new BoundByPhysicsConstrainedByObstacles(new Vector2(120, 120)),
          ]
    ));
  }

  let animator = new Animator(
      new Compositor(
          width,
          height,
          rootEl,
          [new Cloud(width, height), new Layer(width, height, new EntityLibrary(), entities)],
      )
  );

  animator.start();
};
