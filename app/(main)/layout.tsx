import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { Toaster } from "@/components/ui/toaster"

const MainLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <main className=" overflow-hidden">
            
            <NavigationSidebar />
                {children}
                <Toaster /> 
        </main>
       
    );
}

export default MainLayout;