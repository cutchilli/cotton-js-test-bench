import SimpleEntity from "../common/simple-entity";

class Projectile extends SimpleEntity {
  constructor(position, acceleration) {
    super();

    this.position = position;
    this.acceleration = acceleration;
  }

  getName() {
    return 'Projectile';
  }
}

export const runAabbTest = function runAabbTest() {
  // 1. Set up collidable entity

  // 2. Fire random particles at it from various parts of the viewpert

  // 3. Collisions should change the colour of the entity
};
