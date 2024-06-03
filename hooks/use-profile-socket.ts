import { useSocket } from "@/components/providers/socket-provider"
import { Member, Message, Profile } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast"

type ChatSocketProps = {
    queryKey: string,
    profileKey: string,
}

export const useProfileSocket = ({
    queryKey,
    profileKey
}: ChatSocketProps) => {
    const { socket } = useSocket();
    const queryClient = useQueryClient();
    const { toast } = useToast()

    
    useEffect(() => {
        if(!socket) {
            return;
        }

        // Funcionando perfeitamente
        // Inclusão em tempo real de um perfil via o invite
        // Inclusão também de um toaster quando um usuário entra no lobby
        
        socket.on(profileKey, (message: Profile) => {

            const notify = () => toast({
                title: `${message.name} entrou na sala!`,
                description: 'Entre no chat para conversar. 😁',
                
            })
        
            notify();

            queryClient.setQueryData([queryKey], (oldData: any) => {
                if(!oldData || !oldData.pages || oldData.pages.length === 0){ 
                    return {
                        pages: [{
                            items: [message],
                        }]
                    }
                }

                const newData = [...oldData.pages];

                newData[0] = {
                    ...newData[0],
                    items: [
                        message,
                        ...newData[0].items,
                    ]
                };

                return {
                    ...oldData,
                    pages: newData,
                };
            });
        });

        


        return () => {
            socket.off(queryKey);
        }
    }, [queryClient, queryKey, profileKey, socket]);
}