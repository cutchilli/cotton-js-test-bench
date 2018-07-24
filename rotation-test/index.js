import {
  Animator,
  Compositor,
  Layer,
  PolygonEntity,
  EntityLibrary,
  util,
  input,
} from 'cotton-js';

const { Vector2, Polygon } = util;

const rootEl = document.getElementById('yaboi');
const width = window.innerWidth;
const height = window.innerHeight;

const rotationPoint = new Vector2(250, 250);

export class SimplePolygonEntity extends PolygonEntity {
  constructor(pos, entityLibrary, shape) {
    super(pos, shape, entityLibrary, [], false);
  }

  draw() {
    this.memoryCanvas.clear();
    const memoryCanvasContext = this.memoryCanvas.getContext();
    const pointsToDraw = this.shape.zeroShiftedCalcPoints;
    memoryCanvasContext.strokeStyle = "red";
    memoryCanvasContext.beginPath();
    memoryCanvasContext.moveTo(pointsToDraw[0].x, pointsToDraw[0].y);

    let i = this.shape.calcPoints.length;
    while (i--) {
      memoryCanvasContext.lineTo(pointsToDraw[i].x, pointsToDraw[i].y);
    }

    memoryCanvasContext.closePath();
    memoryCanvasContext.stroke();
  }

  update(delta) {
    super.update(delta);

    if (this.anglePerS === 0) return;

    // this.shape.rotate(this.anglePerS * delta, rotationPoint);
    this.position.rotate(this.anglePerS * delta, rotationPoint);

    this.draw();
  }

  setRotation(anglePerS) {
    this.anglePerS = anglePerS;
  }
}

export const runRotationTest = function runRotationTest() {
  const eLib = new EntityLibrary();

  const entities = [];

  const daBoi = new SimplePolygonEntity(new Vector2(370, 370), eLib, new Polygon([
    new Vector2(0, 50),
    new Vector2(70, 50),
    new Vector2(70, 0),
    new Vector2(0, 0),
  ]));

  entities.push(daBoi);
  daBoi.setRotation(0.5);

  let animator = new Animator(
    new Compositor(
      width,
      height,
      rootEl,
      [new Layer(width, height, eLib, entities)]
    )
  );

  animator.start();
};
