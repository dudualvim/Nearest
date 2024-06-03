"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { Dot } from "lucide-react";
import { Badge } from "./ui/badge";

export const SocketIndicator = () => {
    const { isConnected } = useSocket();

    if (!isConnected){
        return (
            <Badge variant={"secondary"}>Reconectando</Badge>
        )
    }
    
    return (
        <Badge variant={"nearest"}>Online</Badge>
    )
}