import { Entity, util } from "cotton-js";
import { Vec } from "../cotton-js/dist/util/math";

const { getRandomNumber, getRandomInt } = util;

const getRandomStarColour = () => {
  const colours = ["225,247,213", "255,189,189", "201,201,255", "241,203,255"];

  return colours[Math.floor(Math.random() * colours.length)];
};

export default class Star extends Entity {
  constructor(
    maxWidth,
    maxHeight,
    pos,
    vel,
    radius = 2,
    colour = getRandomStarColour(),
    opacity = getRandomNumber(0.1, 1),
    trail = getRandomInt(5, 20)
  ) {
    if (radius < 1 || radius > 3)
      throw new exception("radius must be between 2 and 4");

    const size = new Vec(radius * trail, radius * trail);

    super(pos, vel, size);

    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.radius = radius;
    this.opacity = opacity;
    this.colour = colour;
    this.trail = trail;
  }

  initialRender(context) {
    context.fillStyle = `rgba(${this.colour}, ${this.opacity})`;
    context.shadowBlur = this.trail;
    context.shadowColor = `rgba(${this.colour}, ${this.opacity})`;

    // TODO fix sizing issue with entity. This should always be passed in
    context.beginPath();
    context.arc(
      this.size.x / 2,
      this.size.y / 2,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    context.fill();

    context.shadowBlur = 0;
  }

  update(deltaTime) {
    super.update(deltaTime);

    this.pos.x += this.vel.x * deltaTime;
    this.pos.y += this.vel.y * deltaTime;

    if (this.pos.x > this.maxWidth) this.pos.x = 0 - this.size.x;
    if (this.pos.x + this.size.x < 0) this.pos.x = this.maxWidth + this.size.x;
    if (this.pos.y > this.maxHeight) this.pos.y = 0;
    if (this.pos.y + this.size.y < 0) this.pos.y = this.maxHeight - this.size.y;
  }
}
