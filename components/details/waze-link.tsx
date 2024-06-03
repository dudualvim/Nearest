'use client'

import Image from 'next/image';
import React from 'react';

interface WazeLinkProps {
  destinationLat: number;
  destinationLng: number;
  latitude: number;
  longitude: number;
}

const WazeLink: React.FC<WazeLinkProps> = ({ destinationLat, destinationLng, latitude, longitude }) => {
  const isMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const openWaze = () => {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       const { latitude, longitude } = position.coords;
        const baseUrl = isMobile()
            ? `waze://?ll=${destinationLat},${destinationLng}&navigate=yes&from=${latitude},${longitude}`
            : `https://www.waze.com/ul?ll=${destinationLat},${destinationLng}&navigate=yes&from=${latitude},${longitude}`;
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
    <button onClick={openWaze} className="w-full h-20 mt-4 mb-2content-center p-5 rounded-md text-white bg-[#007dfe] dark:bg-slate-900 border-2 hover:border-sky-500 border-sky-600 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
        <div className="flex items-center gap-x-2">
        <Image alt='Waze' src={'https://cdn-icons-png.flaticon.com/512/3771/3771526.png'} width={30} height={30}/>
            <p className="font-semibold">Abrir no Waze</p>
        </div>
    </button>
  );
};

export default WazeLink;
