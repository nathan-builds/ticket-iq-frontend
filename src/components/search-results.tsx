'use client';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import ResultsFilter, { Sort, SortType } from '@/components/results-filter';
import { TicketIqEvents } from '@/components/ticket-iq-events';
import React, { useState } from 'react';
import { TicketIQEvent } from '@/utils/models';
import { CityFilter, NO_CITY_FILTER } from '@/components/city-filter';
import { getListOfUniqueLocations } from '@/utils/utils';
import { CalendarFilter } from '@/components/calendar-filter';

interface SearchResultsProps {
    events: TicketIQEvent[];
}


const SearchResults: React.FC<SearchResultsProps> = ({ events }) => {

    //default filter is just by date
    const [sortType, setSortType] = useState<SortType>('date');
    const [includeFees, setIncludeFees] = useState(false);
    const [cityFilter, setCityFilter] = useState<string>(NO_CITY_FILTER);
    const eventLocations = getListOfUniqueLocations(events);

    const onFilterSelectionChangeHandler = (filter: SortType) => {
        setSortType(filter);
    };

    const onEventCityFilterChangeHandler = (city: string) => {
        setCityFilter(city);
    };

    const onIncludeFeesHandler = () => {
        setIncludeFees(!includeFees);
    };

  


    return (
        <div className="flex flex-col w-full lg:w-1/2  max-w-[900px]">
            <div className="flex flex-col gap-5">
                <div className="flex items-center space-x-2 justify-between pl-1">
                    <div className="flex items-center space-x-2">
                        <Switch id="fees" className="w-[45px] h-[25px] pl-[2px]" onClick={onIncludeFeesHandler}/>
                        <Label className="md:text-lg" htmlFor="fees"> Include Fees</Label>
                    </div>
                    <div className="flex gap-1">
                        {/*<CalendarFilter/>*/}
                        <ResultsFilter filterChanged={onFilterSelectionChangeHandler}/>
                        <CityFilter alertUserCityChange={onEventCityFilterChangeHandler} items={eventLocations}/>
                    </div>
                </div>
                <span className="font-bold text-2xl md:text-xl">Upcoming Events</span>

            </div>
            {events.length === 0 ?
                <div className="self-center pt-28 text-2xl font-bold italic">
                    Dang! No upcoming events!
                </div> :
                <div className="">
                    <TicketIqEvents events={events} sort={sortType} includeFees={includeFees} cityFilter={cityFilter}/>
                </div>
            }


        </div>

    );
};

export default SearchResults;