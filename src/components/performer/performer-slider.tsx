import * as React from 'react';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { PerformerCard } from '@/components/performer/performer-card';
import { Performer } from '@/utils/models';


export interface PerformerSliderProps {
    performers: Performer[];
}

export const PerformerSlider: React.FC<PerformerSliderProps> = ({ performers }) => {
    return (
        <ScrollArea className="w-full mt-5 ">
            <div className="flex  pt-1 pb-2 items-center gap-5 md:gap-10">
                {performers.map((performer, idx) => {
                    return (
                        <PerformerCard
                            key={idx}
                            performer={performer}
                        />);
                })}
                <ScrollBar orientation="horizontal"/>
            </div>
        </ScrollArea>
    );
};

