import { Menu } from "lucide-react"

import { 
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { NavigationMobile } from "./navigation/navigation-mobile"
import { Lobby } from "@prisma/client"

interface MobileToggleInterface {
    lobby: Lobby
}

export const MobileToggle = ({
    lobby
}: MobileToggleInterface) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-zinc-200 dark:hover:bg-slate-950 md:hidden">
                    <Menu className=" text-black dark:text-white" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-lg border-none p-0 gap-0">
                <div className="z-50 w-full">
                    <NavigationMobile 
                        lobby={lobby}
                    />
                </div>
                
            </SheetContent>
        </Sheet>
    )
}