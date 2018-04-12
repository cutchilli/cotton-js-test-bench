import { Animator, Compositor } from '@agierens/cotton-js';
import BackgroundLayer from './background-layer';
import TextLayer from './text-layer';
import Cloud from './cloud';

const canvas = document.getElementById('yaboi');
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

this.animator = new Animator(
  new Compositor(width, height, [
    new Cloud(width, height),
    new BackgroundLayer(width, height),
    new TextLayer(width, height, 'aswin'),
    new TextLayer(width, height, 'lakshman', 70),
    new TextLayer(width, height, '--------', 70 * 2),
    new TextLayer(width, height, 'designer', 70 * 3),
    new TextLayer(width, height, 'developer', 70 * 4),
  ]),
  canvas.getContext('2d'),
);

this.animator.start();
