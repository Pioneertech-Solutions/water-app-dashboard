import Model from "./Model";

class Neighbor extends Model {
  constructor(args = {}) {
    super(args);
    this.firstname = args.firstname || '';
    this.lastname = args.lastname || '';
    this.phone_number = args.phone_number || '';
    this.prefix = args.prefix || '';
    this.alias = args.alias || '';
    this.attitude = args.attitude || '';
    this.comments = args.comments || '';

    this.fullname = `${this.firstname} ${this.lastname}`;
  }
}

export default Neighbor;
