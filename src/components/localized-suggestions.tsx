import { APIService } from '@/services/apiService';
import { PerformerSlider } from '@/components/performer/performer-slider';
import { LocalSuggestions } from '@/utils/models';
import React from 'react';


export interface LocalizedSuggestionsProps {
    suggestions: LocalSuggestions;
}

export const LocalizedSuggestions: React.FC<LocalizedSuggestionsProps> = ({ suggestions }) => {


    return (

        <div className="w-11/12">
            <div className="font-semibold text-xl md:text-3xl align self-start mt-5">
                {suggestions.locationFormatted}
            </div>
            <PerformerSlider performers={suggestions.performers}/>
        </div>

    );
};
