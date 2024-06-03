'use client'

import { LucideInfo } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from 'next/link'

export const DetailPageButton = () => {
    const path = usePathname()

    return (
        <Link
            href={{
            pathname: `${path}/details`,
        }}>
            <Button variant="primary">
                    <LucideInfo className="size-4 text-white mr-2"/>
                    Detalhes
            </Button>
        </Link>

    )
}