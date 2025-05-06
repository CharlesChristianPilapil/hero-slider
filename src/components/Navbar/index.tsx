'use client';
import Link from "next/link"
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathName = usePathname();

    const Links = [
        {
            label: 'Home',
            url: '/',
        },
        {
            label: 'Contact',
            url: '/contact',
        },
        {
            label: 'Info',
            url: '/info',
        }
    ]

    return (
        <nav className={`${pathName !== '/' ? 'bg-black' : ''} h-[50px] z-100 relative text-white`}>
            <ul className="flex gap-5 items-center h-full w-[1536px] max-w-[80%] mx-auto">
                {Links.map((link) => (
                    <li key={link.label}> 
                        <Link href={link.url} className={`${pathName === link.url ? 'pointer-events-none' : ''}`}> 
                            {link.label} 
                        </Link> 
                    </li>
                ))}
            </ul> 
        </nav>
    )
}

export default Navbar