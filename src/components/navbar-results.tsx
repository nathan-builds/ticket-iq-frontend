'use client';
import { Searchbar } from '@/components/searchbar';
import Image, { StaticImageData } from 'next/image';

import ticketIQIcon from '../images/logo_lowercase_32.svg';
import ticketIQIcon1 from '../images/logo_small_uppercase.svg';
import burgerMenu from '../images/burger_menu.svg';
import searchIcon from '../images/search_icon.svg';
import { useState } from 'react';
import Link from 'next/link';


export const NavbarResults = () => {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);


    return (
        <div className="flex flex-col mb-3">
            <div className="flex items-end justify-between h-[50px]">
                {/*<div className="h-[32px] w-[32px] ml-3 md:invisible">*/}
                {/*    <Image*/}
                {/*        className=""*/}
                {/*        src={burgerMenu}*/}
                {/*        alt={''}>*/}
                {/*    </Image>*/}
                {/*</div>*/}
                <div className="mr-3">
                    <Link href={'/'}>
                        <Image
                            className="pl-3"
                            height={150}
                            width={150}
                            src={ticketIQIcon1}
                            alt={''}>
                        </Image>
                    </Link>
                </div>

                <div className="hidden md:block md:w-1/2">
                    <Searchbar color={'#FFFFFF'} height={40} borderRadius={15}/>
                </div>

                <div className="mr-3 h-[32px] w-[32px] hover:cursor-pointer md:invisible"
                     onClick={() => setIsSearchOpen(!isSearchOpen)}>
                    <Image
                        className=""
                        src={searchIcon}
                        alt={''}>
                    </Image>
                </div>

                <div className="hidden mr-10 font-semibold text-xl md:text-3xl md:flex">
                    About
                </div>


            </div>


            <div className={` ${isSearchOpen ? 'visible' : 'invisible'} md:invisible align self-center w-11/12`}>
                <Searchbar color={'#FFFFFF'} height={40} borderRadius={15}/>
            </div>
        </div>

    );
};