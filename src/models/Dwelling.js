import Model from "./Model";

class Dwelling extends Model {
  constructor(args = {}) {
    super(args);
    this.title = args.title || '';
    this.coordinates_uuid = args.coordinates_uuid || '';
    this.street_uuid = args.street_uuid || '';
    this.street_number = args.street_number || '';
    this.interior_number = args.interior_number || '';
    this.access_code = args.access_code || '';
    this.inhabited = args.inhabited || false;
    this.type = args.type || '';
    this.type_name = args.type_name || '';
    this.type_color = args.type_color;
    this.comments = args.comments || '';
    this.contributions_count = args.contributions_count || 0;
    this.pending_periods = args.pending_periods || 0;
    this.status_color = this.pending_periods > 0 ? (this.pending_periods > 2 ? 'red' : 'yellow') : '#00d407';
    this.inhabited_color = this.inhabited ? 'blue' : 'gray';
    this.status_description = this.pending_periods > 0 ? 'Atrasado' : 'Al corriente';
    this.neighbors_count = args.neighbors_count || 0;
  }
}

export default Dwelling;
