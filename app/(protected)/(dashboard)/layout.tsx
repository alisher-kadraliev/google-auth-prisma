import React from 'react'
import Navbar from './components/Navbar'
import NavbarPc from './components/NavbarPc'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import BreadCrumb from './components/breadcrumb'

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    if (!session) {
        redirect("/login")
    }
    return (
        <>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <NavbarPc />
                <div className="flex flex-col">
                    <Navbar />
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        <BreadCrumb />
                        {children}
                    </main>
                </div >
            </div>
        </>
    )
}