import { ModeToggle } from "@/components/ModeToggle"
import NavList from "./NavList"
import UserInfo from "./UserInfo"
import SearchItems from "./searchButton/searchItems"
import SearchBtn from "./searchButton/searchBtn"



const Navbar = () => {

    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <NavList />
            <div className="w-full flex-1">
                <SearchBtn />
            </div>
            <ModeToggle />
            <UserInfo />
            <SearchItems />
        </header>

    )
}

export default Navbar


