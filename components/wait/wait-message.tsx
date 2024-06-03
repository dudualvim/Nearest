'use client'
import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"

const WaitMessage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const path = usePathname()
    
    const handleSubmit = () => {
        setIsOpen(true)

        router.push(`${path}/map`)
    }

    return (
        <div className="max-w-[500px] h-[500px] mx-auto flex-1 w-full flex flex-col lg:flex-rw items-center justify-center p-4 gap-2">
            <Card hidden={isOpen} className="w-[500px] h-[500px] bg-white dark:bg-sky-950 border-none">
                <CardHeader>
                    <CardTitle>Clique em próximo quando todos entrarem no Lobby</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Ao clicar em próximo, você será redirecionado para a área de seleção do local.</p>
                </CardContent>
                <CardFooter>
                    <Button variant={"primary"} onClick={() => handleSubmit()}>
                        Próximo
                        <ArrowRight className="h-4 w-4 "/>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default WaitMessage