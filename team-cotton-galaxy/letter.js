import { Entity, util } from "cotton-js";

const { getRandomNumber, Vector2 } = util;

const getRandomLetterColour = () => {
  const colours = ["225,247,213", "255,189,189", "201,201,255", "241,203,255"];

  return colours[Math.floor(Math.random() * colours.length)];
};

export default class Letter extends Entity {
  constructor(maxWidth, maxHeight, pos, letterToDrawMatrix, entityLibrary) {
    let blockSize = new Vector2(10, 10);
    let width = 0;

    letterToDrawMatrix.forEach(arr => {
      if (arr.length > width) {
        width = arr.length;
      }
    });

    let height = letterToDrawMatrix.length;

    super(
      pos,
      new Vector2(50, 50),
      entityLibrary
    );

    this.velocity = new Vector2(60, 60);
    this.blockSize = blockSize;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.letterToDrawMatrix = letterToDrawMatrix;
  }

  draw() {
    const context = this.memoryCanvas.getContext();
    
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

    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
    
    if (this.position.x < 0 || this.position.x > this.maxWidth - this.size.x)
      this.velocity.x = -this.velocity.x;

    if (this.position.y < 0 || this.position.y > this.maxHeight - this.size.y)
      this.velocity.y = -this.velocity.y;
  }
}
