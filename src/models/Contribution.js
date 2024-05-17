import Model from "./Model";

class Contribution extends Model {
  constructor(args = {}) {
    super(args);
    this.amount = args.amount || 0;
    this.folio = args.folio || "";
    this.comments = args.comments || "";
    this.status = args.status || "";
    this.neighbor_name = args.neighbor_name || "";
    this.collector_name = args.collector_name || "Sin asignar";
    this.neighbor_uuid = args.neighbor_uuid || "";
    this.dwelling_uuid = args.dwelling_uuid || "";
    this.collector_uuid = args.collector_uuid || "";
    this.date_text = this.getDateText();
  }

  getDateText() {
    // convert date to text format MX and return text
    const date = new Date(this.created_at);
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

export default Contribution;
