import Model from "./Model";

class Street extends Model {
  constructor(args = {}) {
    super(args);
    this.name = args.name || '';
  }
}

export default Street;
