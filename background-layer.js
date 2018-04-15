import { Layer, util } from "cotton-js";

import Star from "./star";

const { Vec, getRandomNumber } = util;
const starCount = 100;

export default class BackgroundLayer extends Layer {
  constructor(width, height) {
    super(width, height);

    this.addEntities(this.createStars());
  }

  createStars() {
    const stars = [];

    var maxVelocity = 100;

    for (let i = 0; i < starCount; i += 1) {
      stars.push(
        new Star(
          this.width,
          this.height,
          new Vec(
            getRandomNumber(0, this.width),
            getRandomNumber(0, this.height)
          ),
          new Vec(
            getRandomNumber(-maxVelocity, maxVelocity),
            getRandomNumber(-maxVelocity, maxVelocity)
          ),
          getRandomNumber(1, 2)
        )
      );
    }

    return stars;
  }
}
