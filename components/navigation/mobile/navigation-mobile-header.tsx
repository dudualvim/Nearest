
interface MobileHeaderInterface {
    name: string,
}

export const MobileHeader = ({
    name
}: MobileHeaderInterface) => {
    return (
        <div className="text-md flex h-12 font-semibold px-3  items-center border-neutral-200 dark:border-slate-800 border-b-2">
            
            <p className="font-semibold text-md text-black dark:text-white">
                Evento: {name}
            </p>
        </div>
    )
}