// Page.tsx
'use client';

import { ThemeProvider } from 'next-themes';
import Image from "next/image";
import Cards from "./components/Cards";
import Search from "./components/Search";
import Type from "./components/Type";
import ThemeButton from './components/ThemeButton';

const Page = () => {

    return(
        <ThemeProvider>
        {/* <div className="circlePosition absolute z-0 top-[20%] left-[10%] transform -translate-x-1/2 -translate-y-1/2 w-[770px] h-[210px] bg-[#2563eb]/30 rounded-[100%] blur-[250px]"></div> */}
        <div className="circlePosition absolute z-0 right-[40%] bottom-[10%] transform w-[770px] h-[210px] bg-[#2563eb]/30 rounded-[100%] blur-[250px]"></div>
        {/* <div className="circlePosition absolute z-0 right-[10%] top-[10%] transform w-[770px] h-[210px] bg-[#477df0]/30 rounded-[100%] blur-[250px]"></div> */}
        <div className="circlePosition absolute z-0 right-[10%] top-[50%] transform w-[880px] h-[210px] bg-[#477df0]/30 rounded-[100%] blur-[250px]"></div>
        <div className="circlePosition absolute z-0 right-[6%] top-[8%] transform w-[880px] h-[500px] bg-[#477df0]/30 rounded-[100%] blur-[250px]"></div>
        {/* dark:bg-slate-700 */}
        <div className="bg-gray-100 dark:bg-black flex min-h-screen flex-col py-12 ">
            <ThemeButton />
            <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
                
                <Image
                    alt="Logo"
                    height="70"
                    width="100"
                    className="mx-auto relative z-1 w-auto"
                    src="/images/Nearest.png"
                />
                <div className="mt-8 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white-100">
                    <h2 className="text-gray-900 dark:text-white">Nearest</h2>
                    <Type />
                </div>
                <Search />
            </div>
            <Cards />            
        </div>
        </ThemeProvider>
        
    )
}

export default Page;