'use client';
import { LocalSuggestions, Location } from '@/utils/models';
import React, { useEffect, useState } from 'react';
import { PerformerSliderLocal } from '@/components/performer/performer-slider-local';

import { LocationSearch } from '@/components/location-search';
import { APIService } from '@/services/apiService';


export interface LocalizedSuggestionsProps {
    location: Location;
}

export const LocalizedSuggestions = (props: LocalizedSuggestionsProps) => {

    const [localPerformers, setLocalPerformers] = useState<LocalSuggestions | null>();
    const [location, setLocation] = useState(props.location);

    const getLocalSuggestions = async () => {
        const suggestedLocalPerformers = await APIService.getLocalSuggestions(location);
        setLocalPerformers(suggestedLocalPerformers);
    };

    useEffect(() => {
        getLocalSuggestions();
    }, [location]);

    const onLocationChange = (loc: Location) => {
        console.log(loc);
        setLocation(loc);
    };


    /**
     * Even though there is a location, there may be no performers or issues occurs getting them. Only displacy them
     * if we are able to get the local suggestions.s
     */
    if (!localPerformers) {
        return (<div/>);
    }

    return (
        <div className="w-11/12 mb-14">
            <div className=" flex flex-col font-semibold text-3xl md:text-4xl align self-start mt-5">
                <div>{localPerformers?.locationFormatted}</div>
                <div className="">
                    <LocationSearch onLocationChange={onLocationChange}/>
                </div>
            </div>
            <PerformerSliderLocal performers={localPerformers.performers}/>
        </div>


    );
};
