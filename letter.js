import { Entity, util } from '@agierens/cotton-js';

const getRandomLetterColour = () => {
  const colours = [
    '225,247,213',
    '255,189,189',
    '201,201,255',
    '241,203,255',
  ];

  return colours[Math.floor(Math.random() * colours.length)];
};

export default class Letter extends Entity {
  constructor(pos, letterToDrawMatrix) {
    super();

    this.pos = pos;
    this.vel = new util.Vec(50, 50);
    this.size = 10;
    this.letterToDrawMatrix = letterToDrawMatrix;

    this.buffer = document.createElement('canvas');
    this.bufferContext = this.buffer.getContext('2d');

    this.drawLetter();
    setInterval(() => {
      this.drawLetter();
    }, 250);
  }

  drawLetter() {
    this.width = this.letterToDrawMatrix[0].length;
    this.letterToDrawMatrix.forEach((arr) => {
      if (arr.length > this.width) {
        this.width = arr.length;
      }
    });
    this.height = this.letterToDrawMatrix.length;
    this.buffer.width = this.size * this.width;
    this.buffer.height = this.size * this.height;
    this.bufferContext.fillStyle = `rgba(${getRandomLetterColour()}, ${1})`;
    this.bufferContext.shadowBlur = 0;
    
    for (let y = 0; y < this.letterToDrawMatrix.length; y += 1) {
      const row = this.letterToDrawMatrix[y];
      for (let x = 0; x < row.length; x += 1) {
        if (row[x]) {
          this.bufferContext.fillRect((x * this.size), (y * this.size), this.size, this.size);
        }
      }
    }
  }

  update(deltaTime) {
    super.update(deltaTime);

    this.pos.y += this.vel.y * deltaTime;
    this.pos.x += this.vel.x * deltaTime;

    if (this.vel.x === 1 || this.vel.x === -1) this.vel.x = 0;
    if (this.vel.y === 1 || this.vel.y === -1) this.vel.y = 0;

    this.vel.x = util.getRandomNumber(this.vel.x - 0.1, this.vel.x + 0.1);
    this.vel.y = util.getRandomNumber(this.vel.y - 0.1, this.vel.y + 0.1);

    if (this.pos.y < 0) this.vel.y = -this.vel.y;
    if (this.pos.x < 0) this.vel.x = -this.vel.x;
    if (this.pos.y > ((window.innerHeight / 2) - (this.size * this.height))) this.vel.y = -this.vel.y;
    if (this.pos.x > ((window.innerWidth / 2) - (this.size * this.width))) this.vel.x = -this.vel.x;
  }
}
