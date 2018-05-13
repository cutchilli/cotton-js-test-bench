import Cloud from "../common/cloud";
import { Animator, Compositor, Layer, Entity, util, input, EntityLibrary } from "cotton-js";
import SimpleEntity from '../common/simple-entity';

const { Keyboard, Mouse, PRESSED, RELEASED } = input;
const { getRandomInt } = util;

export const runInputTest = function runInputTest() {
  const rootEl = document.getElementById('yaboi');
  const width = window.innerWidth;
  const height = window.innerHeight;

  const movableEntity = new SimpleEntity(
      new util.Vector2(0, 0),
      new util.Vector2(50, 50)
  );

  const keyboardHandler = new Keyboard(window);

  keyboardHandler.addMapping('ArrowLeft', () => {
      movableEntity.position.x -= 10;
  });

  keyboardHandler.addMapping('ArrowRight', () => {
      movableEntity.position.x += 10;
  });

  keyboardHandler.addMapping('ArrowUp', () => {
      movableEntity.position.y -= 10;
  });

  keyboardHandler.addMapping('ArrowDown', () => {
      movableEntity.position.y += 10;
  });

  const mouseMove = new Mouse(window);
  const mouseClick = new Mouse(window);

  const demoOptions = [() => {
    console.log("RUNNING THE CLICK TEST");
    mouseClick.addMapping('click', (mouseInfo) => {
        movableEntity.position.x += 10;
      });
  }, () => {
    console.log("RUNNING THE MOVE TEST");
    mouseMove.addMapping('move', (mouseInfo) => {
        console.log(`x:${mouseInfo.pointerPosition.x}, y:${mouseInfo.pointerPosition.y}`);
        movableEntity.position.x = mouseInfo.pointerPosition.x;
        movableEntity.position.y = mouseInfo.pointerPosition.y;
      });
  }];

  // Run a random demo
  const randomMouseTestIdx = getRandomInt(0, 10) > 5 ? 1 : 0;
  demoOptions[randomMouseTestIdx]();

  let animator = new Animator(
      new Compositor(
          width,
          height,
          rootEl,
          [new Layer(width, height, new EntityLibrary(), [movableEntity])],
      )
  );

  animator.start();
};
