'use client'

import axios from "axios"
import { LogOutIcon } from "lucide-react"
import { redirect } from "next/navigation"


export const Logout = () => {
    

    const logout = async () => {
        try {
            const response = await axios.delete('/api/lobby/exit')
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex" onClick={logout}>
            <LogOutIcon className="h-4 w-4 mr-2 text-rose-600" />
            <p className="text-sm text-bold text-rose-600">
                Sair
            </p>
        </div>
    )
}