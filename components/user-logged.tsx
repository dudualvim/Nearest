import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { currentProfile } from "@/lib/current-profile";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { Logout } from "./logout";

export const UserLogged = async () => {
    const profile = await currentProfile();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="bg-transparent border-0" variant="outline" size="icon">
                    <Avatar className={cn(
                        "h-7 w-7 md:h-10 md:w-10"
                    )}>
                        <AvatarImage src={profile?.imageUrl}/>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem >
                    <Logout />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}