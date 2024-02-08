import Image from 'next/image';
import ticketIQIcon from '../images/logo_lowercase_32.svg';
import Link from 'next/link';

export const Navbar = () => {
    return (
        <div className="flex justify-between items-end">
            <Link href={'/'}>
                <Image
                    className="ml-5"
                    height={200}
                    width={200}
                    src={ticketIQIcon}
                    alt={''}>
                </Image>
            </Link>
            <span className="mr-10 font-semibold text-xl md:text-3xl hover:cursor-pointer">
                About
            </span>
        </div>
    );
};