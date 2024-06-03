'use client'

import React from 'react';

interface UberLinkProps {
  destinationLat: number;
  destinationLng: number;
  latitude: number;
  longitude: number;
}

const UberLink: React.FC<UberLinkProps> = ({ destinationLat, destinationLng, latitude, longitude }) => {
  const isMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const openUber = () => {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       const { latitude, longitude } = position.coords;
          const baseUrl = isMobile()
            ? `uber://?action=setPickup&pickup[latitude]=${latitude}&pickup[longitude]=${longitude}&dropoff[latitude]=${destinationLat}&dropoff[longitude]=${destinationLng}&dropoff[nickname]=Destination`
            : `https://m.uber.com/ul/?action=setPickup&pickup[latitude]=${latitude}&pickup[longitude]=${longitude}&dropoff[latitude]=${destinationLat}&dropoff[longitude]=${destinationLng}&dropoff[nickname]=Destination`;
            window.open(baseUrl, '_blank');
    //     },
    //     (error) => {
    //       console.error('Error getting user location:', error);
    //       alert('Unable to retrieve your location');
    //     }
    //   );
    // } else {
    //   alert('Geolocation is not supported by your browser');
    // }
  };

  return (
    <button onClick={openUber} className="size-6 bg-sky-500 w-full mt-4 mb-2 transition cursor-pointer  hover:bg-sky-600 content-center p-5 rounded-md">
        <div className="flex items-center gap-x-2">
            <p className="font-semibold">Uber</p>
        </div>
    </button>
  );
};

export default UberLink;
