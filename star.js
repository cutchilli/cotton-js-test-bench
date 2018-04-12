import { Entity, util } from '@agierens/cotton-js';

const { getRandomNumber } = util;

const getRandomStarColour = () => {
  const colours = [
    '225,247,213',
    '255,189,189',
    '201,201,255',
    '241,203,255',
  ];

  return colours[Math.floor(Math.random() * colours.length)];
};

export default class Star extends Entity {
  constructor(
    maxWidth,
    maxHeight,
    pos,
    vel,
    colour = getRandomStarColour(),
    opacity = Math.random(),
    trail = getRandomNumber(0, 40),
    size = getRandomNumber(0.2, 0.9),
  ) {
    super();

    this.pos = pos;
    this.vel = vel;
    this.size = size;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.maxRadius = 4;
    this.radius = this.maxRadius * this.size;
    this.opacity = opacity;
    this.colour = colour;
    this.trail = trail;

    // TODO fix sizing issue with entity. This should always be passed in
    this.buffer = document.createElement('canvas');
    this.bufferContext = this.buffer.getContext('2d');
    this.buffer.width = this.maxRadius * 2;
    this.buffer.height = this.maxRadius * 2;
    this.bufferContext.fillStyle = `rgba(${this.colour}, ${this.opacity})`;
    this.bufferContext.shadowBlur = this.trail;
    this.bufferContext.shadowColor = `rgba(${this.colour}, ${this.opacity})`;
    this.bufferContext.beginPath();
    this.bufferContext.arc(0, 0, this.radius, 0, Math.PI * 2, false);
    this.bufferContext.fill();

    this.bufferContext.shadowBlur = 0;
  }

  update(deltaTime) {
    super.update(deltaTime);

    this.pos.x += this.vel.x * deltaTime;
    this.pos.y += this.vel.y * deltaTime;

    if (this.pos.x > this.maxWidth) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = this.maxWidth;
    if (this.pos.y > this.maxHeight) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = this.maxHeight;
  }
}
