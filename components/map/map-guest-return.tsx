'use client'

import { useMapSocket } from "@/hooks/use-map-socket"

export const MapGuestReturn = () => {
    
    useMapSocket({returnMapKey: 'return:search:map'})

    return (
        <>
        </>
    )
}