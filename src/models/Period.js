import Model from "./Model";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

class Period extends Model {
  constructor(args = {}) {
    super(args);
    this.month = args.month || "";
    this.year = args.year || "";
    this.status = args.status || "";
    this.amount = args.amount || "";
    this.dwelling_uuid = args.dwelling_uuid || "";

    // convert month number to month name
    this.month_name = months[parseInt(this.month) - 1];
  }
}

export default Period;
