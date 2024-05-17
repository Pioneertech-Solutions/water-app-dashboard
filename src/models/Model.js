import { v4 as uuidv4 } from 'uuid';

class Model {
  constructor(args = {}) {
    this.id = args.id;
    this.uuid = args.uuid || uuidv4();
    this.created_at = args.created_at || new Date();
  }
}

export default Model;
