import { NavbarResults } from '@/components/navbar-results';
import { APIService } from '@/services/apiService';
import React from 'react';
import SearchResults from '@/components/search-results';
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';


interface PageProps {
    params: Params,
    searchParams: { performer: string, slug?:string, lat:string,lon:string,country:string }
}

interface Params {
    slug: string;
}

export default async function SearchResultsPage(props: PageProps) {
    //attempt to disable cache
    console.log(props.searchParams);
    const _ = cookies();
    const eventsResult = await APIService.getPerformerEvents(
        props.searchParams.performer,
        props.searchParams.slug
    );
    APIService.testGeoLocation(
        props.searchParams.lat,
        props.searchParams.lon,
        props.searchParams.country);


    return (
        <div>
            <NavbarResults></NavbarResults>
            <div className=" flex flex-col  md:items-center p-1 gap-5">
                <div className="w-full lg:w-1/2  max-w-[900px]">
                    <span
                        className="align self-start font-bold text-3xl md:text-3xl">
                        {eventsResult.attractionName} Tickets
                    </span>
                    <img src={eventsResult.image?.url}
                         className="pl-1 pr-1 w-full max-h-[300px] lg:max-h-[300px] xl:max-h-3/4 border-1 rounded-md border-[#475569] mt-5 object-cover"></img>
                </div>
                <SearchResults events={eventsResult.events ? Object.values(eventsResult.events) : []}/>
            </div>
        </div>

    );
}



