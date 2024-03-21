import ticketIQIcon1 from '@/images/logo/fulllogo_nobuffer.jpg';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FacebookIcon, InstagramIcon } from 'lucide-react';

export const Footer = () => {
    return (
        <div
            className="flex gap-1  mt-auto flex-col-reverse md:flex-row justify-between border-t-[1px] items-center h-[70px] md:h-[50px] text-[#475569]">
            <div className="md:ml-10">&copy;2024 TicketHero. All rights reserved.</div>
            <div className="flex pt-3 gap-5 pb-2 md:mr-10 ">
                <Link href={'/contact'}>
                    Contact
                </Link>
                <Link href={'/about'}>
                    About
                </Link>
                <Link href="https://www.instagram.com/mytickethero/" target={'_blank'}>
                    <InstagramIcon/>
                </Link>
                <Link href="https://www.facebook.com/profile.php?id=61557201956683" target={'_blank'}>
                    <FacebookIcon/>
                </Link>
            </div>

        </div>);
};