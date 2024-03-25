'use client';
import { Searchbar } from '@/components/searchbar';
import ticketIQIcon1 from '../../images/logo/fulllogo_nobuffer.jpg';
import searchIcon from '../../images/search_icon.svg';
import { useState } from 'react';
import Link from 'next/link';
import { NavCategories } from '@/components/navbar/nav-categories';


export const NavbarResults = () => {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);


    return (
        <div className="flex flex-col mb-3 mt-2 gap-5">

            <div className=" hidden  md:flex md:items-end md:justify-between ">
                <div className="flex items-end gap-5">
                    <div className="min-w-[200px]">
                        <Link href={'/'}>
                            <img src={ticketIQIcon1.src} className="pl-3 pb-1.5 h-[50px] md:h-[60px]"/>
                        </Link>
                    </div>
                    <div className="w-[500px] mr-5">
                        <Searchbar color={'#FFFFFF'} height={40} borderRadius={30}/>
                    </div>
                </div>
                <div className="flex mr-5 ">
                    <NavCategories/>
                </div>
            </div>

            <div className="md:hidden flex items-end justify-between">
                <div className="">
                    <Link href={'/'}>
                        <img src={ticketIQIcon1.src} className="pl-3 pb-1.5 h-[50px] md:h-[60px]"/>
                    </Link>
                </div>
                <div className=" h-[32px] w-[32px] hover:cursor-pointer "
                     onClick={() => setIsSearchOpen(!isSearchOpen)}>
                    <img src={searchIcon.src}/>
                </div>
            </div>

            <div className={` ${isSearchOpen ? 'visible' : 'invisible'} md:invisible align self-center w-11/12`}>
                <Searchbar color={'#FFFFFF'} height={40} borderRadius={30}/>
            </div>
        </div>

    );
};