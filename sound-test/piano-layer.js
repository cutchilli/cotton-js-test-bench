import { Layer, util, EntityLibrary } from "cotton-js";


export class PianoLayer extends Layer {
  constructor(width, height, piano, entityLibrary) {
    super(width, height, entityLibrary);

    this.addEntities([piano]);
  }
}
