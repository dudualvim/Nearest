"use client";

import React, { useEffect, useRef, useState } from 'react'

const containerStyle = {
    height: '100vh',
    width: '100%',
};


export const MapContainer = ({
  children
}: {children: React.ReactNode}) => {

  const lat = -16.7058;
  const lng = -49.2174;
  
  const position = {
    lat: -15.8053046, lng: -15.8053046
  };
      
  if (lat !== undefined && lng !== undefined){
      position.lat = +lat;
      position.lng = +lng;
  }

  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new global.window.google.maps.Map(ref.current, {
        disableDefaultUI: true,
        zoom: 20,
        center: position
      }));
    }
  }, [ref, map]);

  return (  
    <>
      <div ref={ref} style={containerStyle} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );  
}