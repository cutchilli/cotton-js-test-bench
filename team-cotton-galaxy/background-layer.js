import { Layer, util, EntityGraph } from "cotton-js";

import Star from "./star";

const { Point, getRandomNumber } = util;
const starCount = 200;

export default class BackgroundLayer extends Layer {
  constructor(width, height) {
    super(width, height, new EntityGraph());

    this.addEntities(this.createStars());
  }

  createStars() {
    const stars = [];

    var maxVelocity = 100;

    for (let i = 0; i < starCount; i += 1) {
      stars.push(
        new Star(
          this.entityGraph,
          this.width,
          this.height,
          new Point(
            getRandomNumber(0, this.width),
            getRandomNumber(0, this.height)
          ),
          new Point(
            getRandomNumber(-maxVelocity, maxVelocity),
            getRandomNumber(-maxVelocity, maxVelocity)
          ),
          getRandomNumber(2, 3)
        )
      );
    }

    return stars;
  }
}
