'use client'

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export const BackButton = () => {
    const router = useRouter();

    return (
        <button onClick={() => router.back()} className="mt-4 p-2 h-10 mb-2 content-center rounded-md text-white bg-[#007dfe] dark:bg-slate-900 border-2 hover:border-sky-500 border-sky-600 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
            <div className="flex items-center ">
                <ArrowLeft className="size-4"/>
                <p className="font-semibold">Voltar</p>
            </div>
        </button>
    )
}

