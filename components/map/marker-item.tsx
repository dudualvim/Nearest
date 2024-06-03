"use client";

import { MarkerF, } from "@react-google-maps/api";

/**
 * Componente que realiza a criação dos marcadores no Google Maps com a localização dos usuários
 */

interface MarkerItemProps {
    lat: number,
    lng: number,
    image?: string,
    title: string,
    type: "place" | "profile"
}

export const MarkerItem = ({
    lat,
    lng,
    image,
    type,
    title
}: MarkerItemProps) => {

    var pinColor = "#0080ff";

    // Pick your pin (hole or no hole)
    var pinSVGHole = "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";
    var labelOriginHole = new google.maps.Point(12,15);
    var pinSVGFilled = "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z";
    var labelOriginFilled =  new google.maps.Point(12,9);

    var markerPlaceImage = {  // https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerLabel
        path: pinSVGHole,
        anchor: new google.maps.Point(12,17),
        fillOpacity: 1,
        fillColor: pinColor,
        strokeWeight: 2,
        strokeColor: "black",
        scale: 2,
        labelOrigin: labelOriginFilled
    };

    var markerProfileImage = {  // https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerLabel
        path: pinSVGHole,
        anchor: new google.maps.Point(12,17),
        fillOpacity: 1,
        fillColor: "#0080ff",
        strokeWeight: 2,
        strokeColor: "black",
        scale: 2,
        labelOrigin: labelOriginFilled
    };

    const icon = {
        url: image,
        scaledSize: new google.maps.Size(50, 50), // scaled size
        
    };
 
    return (
        <>
            {type === "profile" && (
                <MarkerF 
                    animation={google.maps.Animation.DROP} 
                    icon={markerProfileImage} 
                    title={title}
                    zIndex={1}
                    position={{ lat, lng }}
                />
            )}
            {type === "place" && (
                <MarkerF 
                    animation={google.maps.Animation.DROP} 
                    icon={icon} 
                    title={title}
                    zIndex={1} 
                    position={{ lat, lng }}
                />
            )}
        </>
    )
}