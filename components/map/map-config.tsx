"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import axios from "axios"
import { LogOut, Moon, Settings, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { redirect } from "next/navigation"
import queryString from "query-string"
import { useRouter } from "next/navigation" 

interface MapConfigProps {
    query: Record<string, any>,
}

export const MapConfig = ({
    query
}: MapConfigProps) => {
    const { setTheme } = useTheme()
    const router = useRouter();

    const onClick = async () => {
        try {
            const url = queryString.stringifyUrl({
                url: '/api/lobby/exit', 
                query, // profileId
            });

            await axios.delete(url);

            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="absolute shadow-lg dark:hover:bg-zinc-700 hover:bg-zinc-200 transition flex top-2 rounded-md items-center justify-center right-2 h-12 w-12 bg-white dark:bg-zinc-900">
                    <Settings className="h-6 w-6"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem >
                    <button onClick={() => setTheme("light")} className="flex h-full w-full rounded-md p-2 items-center gap-x-2 hover:bg-zinc-400 dark:hover:bg-zinc-600 ">
                        <Sun className="h-4 dark:text-zinc-200 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <p className="dark:text-zinc-200 font-semibold text-sm">Claro</p>
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <button onClick={() => setTheme("dark")} className="flex h-full w-full rounded-md p-2 items-center gap-x-2 hover:bg-zinc-400 dark:hover:bg-zinc-600 ">
                        <Moon className="h-4 dark:text-white w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <p className="dark:text-zinc-200 font-semibold text-sm">Escuro</p>
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <button onClick={onClick} className="flex h-full w-full rounded-md p-2 items-center gap-x-2 hover:bg-zinc-400 dark:hover:bg-zinc-600 ">
                        <LogOut className="text-red-600 h-4 w-4 gap-x-2" />
                        <p className="text-red-600 font-semibold text-sm">Sair</p>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}