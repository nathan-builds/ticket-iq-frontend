import Image from 'next/image';
import ticketIQIcon from '../images/logo_lowercase_32.svg';
import Link from 'next/link';
import ticketIQIcon1 from '../images/logo_small_uppercase.svg';

export const Navbar = () => {
    return (
        <div className="flex justify-between items-end ">
            <Link href={'/'}>
                <img src={ticketIQIcon1.src} className='pl-2'  />
            </Link>
            <Link href={'/about'}>
            <span className="mr-10 font-semibold text-xl md:text-3xl hover:cursor-pointer">
                About
            </span>
            </Link>
        </div>
    );
};