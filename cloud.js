import { Layer } from '@agierens/cotton-js';

export default class Cloud extends Layer {
  constructor(width, height) {
    super(width, height, []);
  }

  draw(context) {
    const blueCloud = context.createRadialGradient(0, 0, this.width / 4, this.width / 2, this.height / 2, 2000);
    blueCloud.addColorStop(0, '#061f47');
    blueCloud.addColorStop(1, '#000000');
    context.fillStyle = blueCloud;
    context.fillRect(0, 0, this.width, this.height);
  }
}
