'use client';
import { Event } from '@/components/event';
import React, { useState } from 'react';
import { TicketIQEvent } from '@/utils/models';
import { Button } from '@/components/ui/button';
import { SortType } from '@/components/results-filter';
import { NO_CITY_FILTER } from '@/components/city-filter';

export interface SearchResultProps {
    events: TicketIQEvent[],
    includeFees: boolean,
    sort: SortType,
    cityFilter: string

}


/**
 * Component displays Events, each event is a TicketIQ event that has different vendor options at price points
 * The MORE button is displayed until there are no more events to show
 * @param events
 * @constructor
 */
export const TicketIqEvents: React.FC<SearchResultProps> = ({ events, sort, includeFees, cityFilter }) => {
    const [displayIdx, setDisplayIdx] = useState(10);


    const onMoreClickedHandler = () => {
        setDisplayIdx(displayIdx + 10);
    };


    const priceSort = (a: TicketIQEvent, b: TicketIQEvent) => {
        return a.minPrice - b.minPrice;
    };

    const dateSort = (a: TicketIQEvent, b: TicketIQEvent) => {
        return new Date(a.datetime_utc).getTime() - new Date(b.datetime_utc).getTime();
    };

    const cityFilterFunc = (event: TicketIQEvent): boolean => {
        if (cityFilter === NO_CITY_FILTER) {
            return true;
        }
        const location = `${event.venue.city}, ${event.venue.state}`.toLowerCase();
        return location === cityFilter;

    };

    /**
     * Only display the More button if there are more events AND there is no City filter active
     */
    return (
        <div>
            <div className="flex flex-col mb-3 ">
                {events
                    .filter(cityFilterFunc)
                    .slice(0, Math.min(displayIdx, events.length))
                    .sort(sort === 'price' ? priceSort : dateSort)
                    .map((event, idx) =>
                        (<Event key={idx} eventInfo={event} includeFees={includeFees}/>))}
            </div>
            <div>{includeFees&& '*VividSeats estimated fees'}</div>
            <div className="flex flex-row justify-center">
                <Button className={`w-1/5 h-[35px] ${displayIdx < events.length && cityFilter === NO_CITY_FILTER
                    ? 'visible' : 'invisible'}`}
                        onClick={onMoreClickedHandler}>More</Button>
            </div>
        </div>
    );
};