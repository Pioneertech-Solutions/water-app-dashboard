class MapItem {
  constructor(args = {}) {
    this.dwelling_uuid = args.dwelling_uuid || "";    
    this.color = args.color || "gray";
    this.coordinates_uuid = args.coordinates_uuid || "";
  }
}

export default MapItem;
