"use client";

import { GoogleMap, DirectionsService, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";
import { useTheme } from "next-themes";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface MapWrapperProps {
    lat: number,
    lng: number,
    profileLat: number,
    profileLng: number,
    children: React.ReactNode
}

export const MapWrapper = ({
  profileLat,
  profileLng,  
  lat,
  lng,
  children
}: MapWrapperProps) => {
    const { theme } = useTheme()
    let [zoom, setZoom] = useState(10)
    const [mapLoaded, setMapLoaded] = useState(false);

    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const directionsService = useRef<google.maps.DirectionsService | null>(null);
    const directionsRenderer = useRef<google.maps.DirectionsRenderer | null>(null);
    const mapRef = useRef<google.maps.Map<Element> | null>(null);

    const onMapLoad = useCallback((map: google.maps.Map<Element>) => {
      mapRef.current = map;
      setMapLoaded(true);
    }, []);

    const { isLoaded } = useJsApiLoader({
      id: 'nearest-map',
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string
    })
   
    const center = {
        lat: lat,
        lng: lng
    };

    const style = {
        height: "100vh",
        width: "100%"
    };

    useEffect(() => {
      function z()
      {
        if(zoom < 15) {
          setZoom(zoom += 1) 
        }
      }

      setInterval(z,1000)
     
    }, [zoom])

    const light: Record<string, google.maps.MapTypeStyle[]> = {
      retro: [
        { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [{ color: "#c9b2a6" }],
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "geometry.stroke",
          stylers: [{ color: "#dcd2be" }],
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "labels.text.fill",
          stylers: [{ color: "#ae9e90" }],
        },
        {
          featureType: "landscape.natural",
          elementType: "geometry",
          stylers: [{ color: "#dfd2ae" }],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ color: "#dfd2ae" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#93817c" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [{ color: "#a5b076" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#447530" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#f5f1e6" }],
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [{ color: "#fdfcf8" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#f8c967" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#e9bc62" }],
        },
        {
          featureType: "road.highway.controlled_access",
          elementType: "geometry",
          stylers: [{ color: "#e98d58" }],
        },
        {
          featureType: "road.highway.controlled_access",
          elementType: "geometry.stroke",
          stylers: [{ color: "#db8555" }],
        },
        {
          featureType: "road.local",
          elementType: "labels.text.fill",
          stylers: [{ color: "#806b63" }],
        },
        {
          featureType: "transit.line",
          elementType: "geometry",
          stylers: [{ color: "#dfd2ae" }],
        },
        {
          featureType: "transit.line",
          elementType: "labels.text.fill",
          stylers: [{ color: "#8f7d77" }],
        },
        {
          featureType: "transit.line",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#ebe3cd" }],
        },
        {
          featureType: "transit.station",
          elementType: "geometry",
          stylers: [{ color: "#dfd2ae" }],
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [{ color: "#b9d3c2" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#92998d" }],
        },
      ],
    }

    const night: Record<string, google.maps.MapTypeStyle[]> = {
        night: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#263c3f" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6b9a76" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#38414e" }],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#212a37" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9ca5b3" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#746855" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#1f2835" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#f3d19c" }],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#2f3948" }],
            },
            {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#515c6d" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#17263c" }],
            },
            {
                featureType: "poi.business",
                stylers: [{ visibility: "off" }],
            },
          ],
    }

    let styleMode

    if(theme === 'dark'){
      styleMode = night.night
    } else {
      styleMode = light.retro
    }

    const loading = <div className="hidden"/>

    // directions

    const directionsCallback = useCallback((response: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
      if (status === 'OK') {
          setDirections(response);
      } else {
          console.log(`Error fetching directions: ${status}`);
      }
  }, []);

  const requestDirections = useCallback(() => {
      if (!mapRef.current || !directionsService.current) return;

      directionsService.current.route(
          {
              origin: new google.maps.LatLng(profileLat, profileLng),
              destination: new google.maps.LatLng(lat, lng),
              travelMode: google.maps.TravelMode.DRIVING
          },
          directionsCallback
      );
  }, [lat, lng, directionsCallback]);

  useEffect(() => {
      if (isLoaded && mapLoaded) {
          directionsService.current = new google.maps.DirectionsService();
          directionsRenderer.current = new google.maps.DirectionsRenderer({ map: mapRef.current });

          requestDirections();
      }
  }, [isLoaded, mapLoaded, requestDirections]);
    // fim directions
    
    return isLoaded ? (
          <GoogleMap 
              options={{ disableDefaultUI: true, styles: styleMode }} 
              mapContainerStyle={style} 
              zoom={zoom} 
              center={center}
              onLoad={onMapLoad}
              >
              <>
                {children}
                
                {directions && (
                  <DirectionsRenderer
                      options={{ directions: directions }}
                      onLoad={() => console.log('DirectionsRenderer loaded')}
                      onUnmount={() => console.log('DirectionsRenderer unmounted')}
                  />
                )}
                
              </>
          </GoogleMap>
    
    ) : <></>
}