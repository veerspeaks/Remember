import Link from "next/link"

export default function Navbar(){

    return(
        <div className="flex flex-col justify-center items-center">
            <Link href="/" className="text-6xl md:text-8xl text-red-700 py-8 font-bold">
                <span >REMEMBER?</span>
            </Link>
            
            <input className = "rounded-full w-1/3" placeholder=" Search"/>
        </div>
    )
}