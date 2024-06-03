'use client'

import { useModal } from "@/hooks/use-modal-store";
import Link from "next/link";

const vantagens = [
    {
        name: "Crie um Lobby",
        avatar: "/images/lobby.svg",
        buttonLink: "../createLobby"
    },
    {
        name: "Pra que serve o site?",
        avatar: "/images/duvida.svg",
        buttonLink: "../tutorial" // Destino do link para o segundo card
    }
];

export default function Cards() {
    const { onOpen } = useModal();

    return (
        <div className="px-10 my-10 flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                    <div>
                        <div
                            onClick={() => onOpen("createGuestModel")}
                            className="shadow rounded-lg text-gray-900 bg-white dark:bg-slate-900 border-2 hover:border-[#007dfe] dark:hover:border-[#007dfe] dark:border-slate-800 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                            <div className="p-6 flex flex-col justify-between h-full">
                                <div>
                                    <h3 className="text-xl font-bold dark:text-white text-center">Crie uma sala virtual</h3>
                                    <img src='/images/lobby.svg' alt="Crie um Lobby" className="mt-4 mx-auto w-42 h-36" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link href={'../tutorial'}>
                        <div 
                            className="shadow rounded-lg text-gray-900 bg-white dark:bg-slate-900 border-2 hover:border-[#007dfe] dark:hover:border-[#007dfe] dark:border-slate-800 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                            <div className="p-6 flex flex-col justify-between h-full">
                                <div>
                                    <h3 className="text-xl font-bold dark:text-white text-center">Como funciona?</h3>
                                    <img src='/images/duvida.svg' alt="Pra que serve o site?" className="mt-4 mx-auto w-42 h-36" />
                                </div>
                            </div>
                        </div>
                    </Link>
                
            </div>
        </div>
    );
}
