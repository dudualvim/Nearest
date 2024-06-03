'use client'

import axios from "axios";
import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface RemovePlace {
    markerId: string
    lobbyId: string
    apiUrl: string
}

export const RemovePlace = ({
    markerId,
    lobbyId,
    apiUrl
}: RemovePlace) => {
    const router = useRouter()

    const onClick = async () => {
        await axios.post(apiUrl, {lobbyId: lobbyId, markerId: markerId})

        router.back()
    }

    return (
        <>
            <Button onClick={onClick} variant="primary">
                <RotateCcw  className="size-4 text-white mr-2"/>
                Pesquisar novamente
            </Button>
        </>

    )
}