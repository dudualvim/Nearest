// Page.tsx
'use client';

import Cards from "./components/Card";

import ThemeButton from '@/app/(setup)/components/ThemeButton';
import { ThemeProvider } from 'next-themes';

const Page = () => {

    return(
        <ThemeProvider>
        <div className="circlePosition absolute z-0 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[990px] h-[210px] bg-[#2563eb] rounded-[100%] blur-[250px]"></div>
        <div className="bg-gray-100 dark:bg-slate-700 flex min-h-screen flex-col py-12 sm:px-6 lg:px-8">
            <ThemeButton />
            <Cards />
            
        </div>
        </ThemeProvider>
    )

}
export default Page;