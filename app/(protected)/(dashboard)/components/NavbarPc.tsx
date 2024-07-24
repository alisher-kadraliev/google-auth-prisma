"use client"
import React from 'react'
import {
    Bell, Home,
    LineChart, Package,
    Package2, ShoppingCart,
    Users,
    Triangle
} from "lucide-react"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { usePathname } from 'next/navigation'
import db from '@/lib/db'

const NavbarPc = () => {
    const pathname = usePathname()
    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/dashboard" className="flex items-center border p-2 rounded-lg gap-2 font-semibold">
                        <Triangle className="size-5 fill-foreground" />
                    </Link>
                    {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button> */}
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        <Link
                            href="/dashboard"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary active:bg-slate-100 dark:active:bg-slate-100/15 ${pathname === '/dashboard' ? 'text-primary scale-105' : 'text-muted-foreground'}`}
                        >
                            <Home className="h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link
                            href="/blogs"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary active:bg-slate-100 dark:active:bg-slate-100/15 ${pathname === '/blogs' ? 'text-primary scale-105' : 'text-muted-foreground'}`}
                        >
                            <ShoppingCart className="h-4 w-4" />
                            Blogs
                            {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                6
                            </Badge> */}
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default NavbarPc