import { useEffect } from 'react';

import L from 'leaflet';

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import type { RecyclingPoint } from '../types';

type RecyclingMapProps = {
  points: RecyclingPoint[];
};

const DEFAULT_CENTER: [number, number] = [
  -33.635,
  -71.615,
];

const recyclingMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function isValidCoordinate(
  latitude: number | null,
  longitude: number | null,
): boolean {
  return (
    latitude !== null &&
    longitude !== null &&
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

function FitMapToPoints({
  points,
}: RecyclingMapProps) {
  const map = useMap();

  useEffect(() => {
    const validCoordinates = points
      .filter((point) =>
        isValidCoordinate(
          point.latitude,
          point.longitude,
        ),
      )
      .map(
        (point) =>
          [
            point.latitude as number,
            point.longitude as number,
          ] as [number, number],
      );

    if (validCoordinates.length === 0) {
      map.setView(DEFAULT_CENTER, 13);
      return;
    }

    if (validCoordinates.length === 1) {
      map.setView(validCoordinates[0], 15);
      return;
    }

    const bounds = L.latLngBounds(validCoordinates);

    map.fitBounds(bounds, {
      padding: [40, 40],
      maxZoom: 16,
    });
  }, [map, points]);

  return null;
}

function getOpenStreetMapUrl(
  latitude: number,
  longitude: number,
): string {
  return (
    `https://www.openstreetmap.org/` +
    `?mlat=${latitude}` +
    `&mlon=${longitude}` +
    `#map=17/${latitude}/${longitude}`
  );
}

export function RecyclingMap({
  points,
}: RecyclingMapProps) {
  const pointsWithCoordinates = points.filter(
    (point) =>
      isValidCoordinate(
        point.latitude,
        point.longitude,
      ),
  );

  return (
    <div
      style={{
        width: '100%',
        height: 'clamp(320px, 48vh, 480px)',
        overflow: 'hidden',
        borderRadius: '10px',
        border: '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={13}
        scrollWheelZoom
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <TileLayer
          attribution="&copy; colaboradores de OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitMapToPoints points={pointsWithCoordinates} />

        {pointsWithCoordinates.map((point) => {
          const latitude = point.latitude as number;
          const longitude = point.longitude as number;

          return (
            <Marker
              key={point.id}
              position={[
                latitude,
                longitude,
              ]}
              icon={recyclingMarkerIcon}
            >
              <Popup>
                <div
                  style={{
                    minWidth: '190px',
                  }}
                >
                  <strong
                    style={{
                      display: 'block',
                      marginBottom: '0.35rem',
                      fontSize: '1rem',
                    }}
                  >
                    {point.name}
                  </strong>

                  <span
                    style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {point.address}
                  </span>

                  {point.description ? (
                    <p
                      style={{
                        margin: '0 0 0.6rem',
                      }}
                    >
                      {point.description}
                    </p>
                  ) : null}

                  <a
                    href={getOpenStreetMapUrl(
                      latitude,
                      longitude,
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Abrir ubicación en OpenStreetMap
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}