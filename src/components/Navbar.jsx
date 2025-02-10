import Link from "next/link"
import Search from "./Search"

export default function Navbar(){

    return(
        <div className="flex flex-col justify-center items-center">
            <Link href="/" className="text-6xl md:text-8xl text-yellow-500 py-4 font-bold">
                <span >REMEMBER?</span>
            </Link>
            
            <Search/>
        </div>
    )
}