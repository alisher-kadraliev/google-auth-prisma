import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    CircleUser
} from "lucide-react"
import Image from "next/image"

const UserInfo = async () => {
    const session = await auth()
    if (!session?.user) return null
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        {session.user.image ? (
                            <Image src={session.user.image} alt={session.user.name || ''} width={40} height={40} className="rounded-full" />
                        ) :
                            <CircleUser className="h-5 w-5" />
                        }
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{session.user.name} </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="bg-red-600/85 text-white">
                        <form
                            action={async () => {
                                "use server"
                                await signOut({ redirectTo: '/' })
                            }}
                        >
                            <button type="submit">Sign Out</button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default UserInfo