import Image from 'next/image';
import ticketIQIcon from '../images/logo_lowercase_32.svg';
import Link from 'next/link';
import ticketIQIcon1 from '../images/logo/fulllogo_nobuffer.jpg';
import { NavCategories } from '@/components/nav-categories';

export const Navbar = () => {
    return (
        <div className="flex justify-between items-end mt-2">
            <Link href={'/'}>
                <img src={ticketIQIcon1.src} className="pl-3 h-[50px] md:h-[60px] pb-1.5"/>
            </Link>
            <div className='hidden md:flex mr-5'>
                <NavCategories/>
            </div>
        </div>
    );
};