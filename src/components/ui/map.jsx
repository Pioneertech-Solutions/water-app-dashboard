import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap, Polygon } from "react-leaflet";
import coordinatesData from "../../assets/jsons/coordinates.json";
import structures from "../../assets/jsons/structures.json";
import L from "leaflet";
import "leaflet.markercluster";
import { useDark } from "../../hooks";

export function Map({ children }) {
  const { dark } = useDark();

  return (
    <MapContainer
      center={[18.838349074567912, -96.95478496319822]}
      zoom={17}
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: dark ? "#000" : "#fff",
      }}
      preferCanvas={true}
      zoomControl={false}
    >
      <TileLayer
        url={
          dark
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
        attribution={
          dark
            ? '&copy; <a href="https://carto.com/attributions">CARTO</a>'
            : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }
        maxNativeZoom={19}
        maxZoom={22}
      />
      <StructuresPolygons />
      {children}
    </MapContainer>
  );
}

function StructuresPolygons() {
  const { dark } = useDark();
  const map = useMap();
  const layerRef = useRef(null);

  useEffect(() => {
    if (!layerRef.current) {
      layerRef.current = L.layerGroup().addTo(map);
    } else {
      layerRef.current.clearLayers();
    }

    const markerClusterGroup = L.markerClusterGroup();
    structures.forEach(({ coordinates }) => {
      markerClusterGroup.addLayer(
        L.polygon(coordinates, {
          fill: false,
          interactive: false,
          opacity: 0.25,
          color: dark ? "#4a4a4a" : "gray",
        })
      );
    });

    layerRef.current.addLayer(markerClusterGroup);
  }, [map, dark]);

  return null;
}

export function MapContributions({ data, isLoading, error, callback }) {
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full animate-pulse">Cargando mapa...</div>
    );

  if (!data || error) return <div>Error al obtener los datos.</div>;

  return (
    <Map>
      <MapPolygons map_items={data} callback={callback} />
    </Map>
  );
}

const MapPolygons = ({ map_items = [], callback }) => {
  const { dark } = useDark();
  return (
    <>
      {map_items.map((item) => (
        <Polygon
          key={item.dwelling_uuid}
          color={
            item.color === "gray" ? (dark ? "#4a4a4a" : "gray") : item.color
          }
          //color={dwelling.color}
          fillOpacity={0.5}
          positions={
            coordinatesData.find(({ uuid }) => uuid === item.coordinates_uuid)
              ?.coordinates ?? []
          }
          eventHandlers={{
            click: () => {
              callback(item.dwelling_uuid);
            },
          }}
        ></Polygon>
      ))}
    </>
  );
};
