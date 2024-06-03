'use client'

import Image from 'next/image';
import React from 'react';

interface GoogleMapsLinkProps {
  destinationLat: number;
  destinationLng: number;
  latitude: number;
  longitude: number;
}

const GoogleMapsLink: React.FC<GoogleMapsLinkProps> = ({ destinationLat, destinationLng, latitude, longitude }) => {
  const isMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const openGoogleMaps = () => {
    const baseUrl = isMobile()
      ? `google.maps://?daddr=${destinationLat},${destinationLng}`
      : `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destinationLat},${destinationLng}&travelmode=driving`;
      window.open(baseUrl, '_blank');
  }

  return (
    <button onClick={openGoogleMaps} className="w-full mt-4 h-20 mb-2 content-center p-5 rounded-md text-white bg-[#007dfe] dark:bg-slate-900 border-2 hover:border-sky-500 border-sky-600 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
        <div className="flex items-center gap-x-2">
            <Image alt='Maps' src={'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Google_Maps_icon_%282020%29.svg/512px-Google_Maps_icon_%282020%29.svg.png'} width={30} height={30}/>
            <p className="font-semibold">Abrir no Google Maps</p>
        </div>
    </button>
  );
};

export default GoogleMapsLink;
