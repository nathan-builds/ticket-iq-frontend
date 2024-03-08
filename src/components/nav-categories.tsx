'use client';
import { NavDropdown } from '@/components/nav-dropdown';
import { ArtistNames, COMEDIANS, MLB_TEAMS, NBA_TEAMS, NFL_TEAMS, NHL_TEAMS } from '@/utils/navData';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const NavCategories = () => {
    const router = useRouter();

    const onNavItemSelected = (pName: string) => {
        const performerName = pName.replaceAll(' ', '+');
        router.push(`/results?performer=${performerName}`);

    };

    return (
        <div className='flex gap-5 lg:gap-10'>
            <div className="text-lg  md:flex">
                <NavDropdown
                    title={'Artists'}
                    itemSelected={onNavItemSelected}
                    dropdownItems={ArtistNames}
                    description={'Trending Artists'}/>
            </div>
            <div className="text-lg  md:flex"  >
                <NavDropdown title={'Comedians'}
                             itemSelected={onNavItemSelected}
                             dropdownItems={COMEDIANS}
                             description={'Trending Comedians'}

                />
            </div>
            <div className="text-lg">
                <NavDropdown
                    title={'MLB'}
                    itemSelected={onNavItemSelected}
                    dropdownItems={MLB_TEAMS}
                    description='MLB Teams'
                />
            </div>
            <div className="text-lg">
                <NavDropdown
                    title={'NFL'}
                    itemSelected={onNavItemSelected}
                    dropdownItems={NFL_TEAMS}
                    description={'NFL Teams'}
                />
            </div>
            <div className="text-lg">
                <NavDropdown
                    title={'NHL'}
                    itemSelected={onNavItemSelected}
                    dropdownItems={NHL_TEAMS}
                    description={'NHL Teams'}
                />
            </div>
            <div className="text-lg">
                <NavDropdown
                    title={'NBA'}
                    itemSelected={onNavItemSelected}
                    dropdownItems={NBA_TEAMS}
                    description={'NBA Teams'}
                />
            </div>
            <Link href={'/about'}>
                <div className="text-lg  md:flex">
                    About
                </div>
            </Link>

        </div>
    );

};