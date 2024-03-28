import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { PerformerCard } from '@/components/performer/performer-card';
import * as React from 'react';
import { Performer } from '@/utils/models';

export interface PerformerSliderProps {
    performers: Performer[];
}


/**
 * This is slightly different because of how the sizes work for the performer cards. Possible refactor
 * later to pull out more common code.
 * @param performers The list of performers to show
 * @constructor
 */
export const PerformerSliderLocal: React.FC<PerformerSliderProps> = ({ performers }) => {
    return (
        <ScrollArea className="w-full mt-5 ">
            <div className="flex  pt-1 pb-2 items-center gap-5">
                {performers.map((performer, idx) => {
                    return (
                        <PerformerCard
                            key={idx}
                            performer={performer}
                            className={'flex flex-col pl-2 min-h-[175px] min-w-[300px] max-w-[250px]  lg:min-h[650px] lg:min-w-[300px] hover:cursor-pointer z-0'}

                        />);
                })}
                <ScrollBar orientation="horizontal"/>
            </div>
        </ScrollArea>
    );
};