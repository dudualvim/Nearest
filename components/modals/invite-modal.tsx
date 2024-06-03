"use client";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";

export const InviteModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal();
    const origin = useOrigin();

    const isModalOpen = isOpen && type === "invite";
    const { lobby } = data;
    
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }   

    const onNew = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch(`/api/lobby/${lobby?.id}/invite-code`)
            onOpen("invite", { lobby: response.data });
        } catch(error){
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const inviteUrl = `${origin}/invite/${lobby?.inviteCode}`;
        
    return ( 
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white dark:text-white dark:bg-slate-950 border-none text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl dark:text-white text-center font-bold">
                        Convide seus amigos!
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label
                        className="text-xs font-bold text-zinc-500 dark:text-zinc-300"
                    >   
                        Link de convite para esta sala virtual
                    </Label>
                    <div
                        className="flex items-center mt-2 gap-x-2"
                    >
                        <Input
                            disabled={isLoading}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            value={inviteUrl}
                        />
                        <Button 
                            disabled={isLoading}
                            onClick={onCopy}
                            size="icon" 
                            className="dark:bg-sky-600"
                        >
                            {copied ? <Check className="text-green-500 w-4 h-4 transition"/> : <Copy className="w-4 dark:text-zinc-200 h-4 transition"/>}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}