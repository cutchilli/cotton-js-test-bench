import { Entity, util } from "cotton-js";

const { getRandomNumber, Vec } = util;

const getRandomLetterColour = () => {
  const colours = ["225,247,213", "255,189,189", "201,201,255", "241,203,255"];

  return colours[Math.floor(Math.random() * colours.length)];
};

export default class Letter extends Entity {
  constructor(maxWidth, maxHeight, pos, letterToDrawMatrix) {
    let blockSize = new Vec(10, 10);
    let width = 0;

    letterToDrawMatrix.forEach(arr => {
      if (arr.length > width) {
        width = arr.length;
      }
    });

    let height = letterToDrawMatrix.length;

    super(
      pos,
      new Vec(50, 50),
      new Vec(width * blockSize.x, height * blockSize.y)
    );

    this.blockSize = blockSize;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.letterToDrawMatrix = letterToDrawMatrix;
  }

  initialRender(context) {
    
    context.fillStyle = `rgba(${getRandomLetterColour()}, ${1})`;
    context.shadowBlur = 0;

    for (let y = 0; y < this.letterToDrawMatrix.length; y += 1) {
      const row = this.letterToDrawMatrix[y];
      for (let x = 0; x < row.length; x += 1) {
        if (row[x]) {
          context.fillRect(
            x * this.blockSize.x,
            y * this.blockSize.y,
            this.blockSize.x,
            this.blockSize.y
          );
        }
      }
    }
  }

  update(deltaTime) {
    super.update(deltaTime);

    this.pos.x += this.vel.x * deltaTime;
    this.pos.y += this.vel.y * deltaTime;
    // Bounce
    var variance = 0.2;

    if (this.pos.x < 0 || this.pos.x > this.maxWidth - this.size.x)
      this.vel.x = -util.getRandomNumber(
        this.vel.x - variance,
        this.vel.x + variance
      );

    if (this.pos.y < 0 || this.pos.y > this.maxHeight - this.size.y)
      this.vel.y = -util.getRandomNumber(
        this.vel.y - variance,
        this.vel.y + variance
      );
  }
}
