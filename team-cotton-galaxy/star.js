import { Entity, util, EntityGraph } from "cotton-js";

const { getRandomNumber, getRandomInt } = util;

const getRandomStarColour = () => {
  const colours = ["225,247,213", "255,189,189", "201,201,255", "241,203,255"];

  return colours[Math.floor(Math.random() * colours.length)];
};

export default class Star extends Entity {
  constructor(
    entityGraph,
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

    const size = new util.Point(radius * trail, radius * trail);

    super(pos, vel, size, entityGraph);

    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.radius = radius;
    this.opacity = opacity;
    this.colour = colour;
    this.trail = trail;
  }

  draw() {
    const context = this.buffer.getContext();

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

    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;

    if (this.position.x > this.maxWidth) this.position.x = 0 - this.size.x;
    if (this.position.x + this.size.x < 0) this.position.x = this.maxWidth + this.size.x;
    if (this.position.y > this.maxHeight) this.position.y = 0;
    if (this.position.y + this.size.y < 0) this.position.y = this.maxHeight - this.size.y;
  }
}
