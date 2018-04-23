import Cloud from "../common/cloud";
import { Animator, Compositor, Layer, Entity, util, input, EntityGraph } from "cotton-js";
import SimpleEntity from '../common/simple-entity';

export const runInputTest = function runInputTest() {
  const rootEl = document.getElementById('yaboi');
  const width = window.innerWidth;
  const height = window.innerHeight;

  const movableEntity = new SimpleEntity(
      new util.Point(0, 0),
      new util.Point(50, 50)
  );

  const inputHandler = new input.Keyboard(window);

  inputHandler.addMapping('ArrowLeft', () => {
      movableEntity.position.x -= 10;
  });

  inputHandler.addMapping('ArrowRight', () => {
      movableEntity.position.x += 10;
  });

  inputHandler.addMapping('ArrowUp', () => {
      movableEntity.position.y -= 10;
  });

  inputHandler.addMapping('ArrowDown', () => {
      movableEntity.position.y += 10;
  });

  let animator = new Animator(
      new Compositor(
          width,
          height,
          rootEl,
          [new Layer(width, height, new EntityGraph(), [movableEntity])],
      )
  );

  animator.start();
};
