import * as React from 'react';
import Image from 'next/image';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { PerformerCard } from '@/components/performer-card';
import { testCardImages } from '@/utils/testData';
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
                            img={performer.image}
                            title={performer.performerName}
                            desc={performer.nextEvent}/>);
                })}
                <ScrollBar orientation="horizontal"/>
            </div>
        </ScrollArea>
    );
};

