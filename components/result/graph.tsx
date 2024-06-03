'use client'

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, CircleMarker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Node {
  id: number,
  nome: string,
  lat: number,
  lng: number,
}

interface Edge {
  from: number;
  to: number;
}

const edges: Edge[] = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 4, to: 1 },
];

interface GraphProps {
  userPoints: any[],
  nearestPlace: any,
  middlePoint: {
    latitude: number,
    longitude: number,
  },
}

const GraphLayer = ({
    userPoints,
    nearestPlace,
    middlePoint,
}: GraphProps) => {
  const map = useMap();

  const points: any[] = []
  
  userPoints.map((item, i) => {
    points.push([
      [item.lat,item.lng],
      [nearestPlace.lat,nearestPlace.lng]
    ])
  })

  

  useEffect(() => {

    

    userPoints.forEach(node => {
      L.circleMarker([node.lat, node.lng], {
        radius: 15,
        fillColor: '#020617',
        color: '#0ea5e9',
        weight: 2,
        opacity: 1,
        fillOpacity: 1,
      }).addTo(map).bindPopup(`${node.nome}`);
    });

    L.circleMarker([nearestPlace.lat, nearestPlace.lng], {
      radius: 15,
      fillColor: '#0ea5e9',
      color: '#020617',
      weight: 2,
      opacity: 1,
      fillOpacity: 1,
    }).addTo(map).bindPopup(`${nearestPlace.name}`);


    // ponto do meio
    L.circleMarker([middlePoint.latitude, middlePoint.longitude], {
      radius: 15,
      fillColor: '#f95959',
      color: '#f95959',
      weight: 2,
      opacity: 1,
      fillOpacity: 1,
    }).addTo(map).bindPopup('Ponto médio');

    edges.forEach(edge => {
      const fromNode = userPoints.find(node => node.id === edge.from);
      const toNode = userPoints.find(node => node.id === edge.to);
      if (fromNode && toNode) {
        L.polyline(
          points,
          {
            color: '#0ea5e9',
            weight: 5,
            opacity: 0.8,
          },
        ).addTo(map);
      }
    });
  }, [map]);

  return null;
};

const MapComponent = ({
  userPoints,
  nearestPlace,
  middlePoint
}: GraphProps) => {
  return (
    <MapContainer center={[nearestPlace.lat, nearestPlace.lng]} zoom={10} style={{ height: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
      <GraphLayer userPoints={userPoints} nearestPlace={nearestPlace} middlePoint={middlePoint}/>
    </MapContainer>
  );
};

export default MapComponent;
