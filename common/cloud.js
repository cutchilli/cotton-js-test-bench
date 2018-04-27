import { Entity, Layer, util, EntityLibrary } from "cotton-js";

class CloudParticle extends Entity {
  constructor(pos, vel, size, entityLibrary) {
    super(pos, size, entityLibrary);
  }

  draw() {
    const context = this.buffer.getContext();

    const blueCloud = context.createRadialGradient(
      0,
      0,
      this.size.x / 4,
      this.size.x / 2,
      this.size.y / 2,
      2000
    );

    blueCloud.addColorStop(0, "#061f47");
    blueCloud.addColorStop(1, "#000000");

    context.fillStyle = blueCloud;
    context.fillRect(0, 0, this.size.x, this.size.y);
  }
}

export default class Cloud extends Layer {
  constructor(width, height) {
    super(width, height, new EntityLibrary());

    this.addEntity(
      new CloudParticle(
        new util.Vector2(0, 0),
        new util.Vector2(0, 0),
        new util.Vector2(this.width, this.height),
        this.entityLibrary
      )
    );
  }
}
