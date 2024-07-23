"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    Home, Menu, Package2
} from "lucide-react"
import { usePathname } from 'next/navigation'

const NavList = () => {
    const pathname = usePathname()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold"
                    >
                        <Package2 className="h-6 w-6" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <Link
                        href="#"
                        className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground active:bg-slate-100 ${pathname === '/dashboard' ? 'text-primary scale-105' : 'text-muted-foreground'}`}

                    >
                        <Home className="h-5 w-5" />
                        Dashboard
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    )
}

export default NavList