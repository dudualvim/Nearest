import { useSocket } from "@/components/providers/socket-provider"
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

type MapSocketProps = {
    mapKey?: String,
    returnMapKey?: String,
}

export const useMapSocket = ({
    mapKey,
    returnMapKey
}: MapSocketProps) => {
    const { socket } = useSocket();
    const queryClient = useQueryClient();
    const router = useRouter()
    const path = usePathname()


    useEffect(() => {
        if(!socket) {
            return;
        }

        socket.on(mapKey, () => {
            return router.push(`${path}` + '/map2');
        });

        socket.on(returnMapKey, () => {
            return router.back();
        });

        return () => {
            socket.off(mapKey);
            socket.off(returnMapKey);
        }
    }, [queryClient, mapKey, socket]);
}