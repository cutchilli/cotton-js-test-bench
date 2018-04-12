import { Layer, util } from '@agierens/cotton-js';

import Star from './star';

const { Vec, getRandomNumber } = util;
const starCount = getRandomNumber(900, 1000);

export default class BackgroundLayer extends Layer {
  constructor(width, height) {
    super(width, height);

    this.entities = this.createStars();
  }

  createStars() {
    const stars = [];

    for (let i = 0; i < starCount; i += 1) {
      stars.push(new Star(
        this.width,
        this.height,
        new Vec(getRandomNumber(0, this.width), getRandomNumber(0, this.height)),
        new Vec(-2, -2),
      ));
    }

    return stars;
  }
}
