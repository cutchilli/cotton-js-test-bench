import { Layer, util, EntityLibrary } from "cotton-js";

import Star from "./star";

const { Vector2, getRandomNumber } = util;
const starCount = 200;

export default class BackgroundLayer extends Layer {
  constructor(width, height) {
    super(width, height, new EntityLibrary());

    this.addEntities(this.createStars());
  }

  createStars() {
    const stars = [];

    var maxVelocity = 100;

    for (let i = 0; i < starCount; i += 1) {
      stars.push(
        new Star(
          this.entityLibrary,
          this.width,
          this.height,
          new Vector2(
            getRandomNumber(0, this.width),
            getRandomNumber(0, this.height)
          ),
          new Vector2(
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
