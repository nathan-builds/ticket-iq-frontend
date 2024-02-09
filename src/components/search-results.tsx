'use client';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import ResultsFilter, { Sort, SortType } from '@/components/results-filter';
import { TicketIqEvents } from '@/components/ticket-iq-events';
import React, { useState } from 'react';
import { TicketIQEvent } from '@/utils/models';

interface SearchResultsProps {
    events: TicketIQEvent[];
}


const SearchResults: React.FC<SearchResultsProps> = ({ events }) => {

    //default filter is just by date
    const [sortType, setSortType] = useState<SortType>('date');
    const [includeFees, setIncludeFees] = useState(false);

    const onFilterSelectionChangeHandler = (filter: SortType) => {
        console.log(`Sort changed, in search results type is ${filter}`);
        setSortType(filter);
    };

    const onIncludeFeesHandler = () => {
        setIncludeFees(!includeFees);
    };


    return (
        <div className="flex flex-col w-full lg:w-3/4  ">
            <div className="flex flex-col gap-5">
                <div className="flex items-center space-x-2 justify-between pl-1">
                    <div className="flex items-center space-x-2">
                        <Switch id="fees" className="w-[40px] h-[25px]" onClick={onIncludeFeesHandler}/>
                        <Label className="md:text-lg" htmlFor="fees"> Include Fees</Label>
                    </div>
                    <ResultsFilter filterChanged={onFilterSelectionChangeHandler}/>
                </div>
                <span className="font-bold text-2xl md:text-xl">Upcoming Events</span>
            </div>
            {events.length === 0 ?
                <div className='self-center pt-28 text-2xl font-bold italic'>
                    Dang! No upcoming events!
                </div> :
                <div className="p-2">
                    <TicketIqEvents events={events} sort={sortType} includeFees={includeFees}/>
                </div>
            }


        </div>

    );
};

export default SearchResults;