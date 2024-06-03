'use client'

import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle 
} from "@/components/ui/card"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useMapSocket } from "@/hooks/use-map-socket"
import { Loader2 } from "lucide-react"

const WaitMessageGuest = () => {
    const [isOpen, setIsOpen] = useState(false)
    const mapKey = 'redirect:map';
    
    useMapSocket({mapKey:'redirect:map'})


    return (
            <Card hidden={isOpen} className="fixed top-1/2 p-4 left-1/2 -translate-x-1/2 -translate-y-1/2  dark:text-white">
                <CardHeader>
                    <img src="https://previews.123rf.com/images/tanyagree/tanyagree2011/tanyagree201100019/158795632-people-sitting-at-the-tables-in-a-bar-and-drinking-beer-women-and-men-talking-and-smiling-in-a-cafe.jpg" width={'500px'} className="flex items-center justify-center"/>
                    <CardTitle>O anfitrião está selecionando o local de encontro</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Você será redirecionado para a área de seleção do local.</p>
                    <div className="flex items-center justify-center">
                        <Loader2 className="gap-y-2 text-center size-10 text-blue-600 animate-spin"/>
                    </div>
                </CardContent>
                <CardFooter>
                </CardFooter>
            </Card>
    )
}

export default WaitMessageGuest