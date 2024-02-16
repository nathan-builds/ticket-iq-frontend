import { Performer } from '@/utils/models';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { PerformerCard } from '@/components/performer-card';

export interface PerformerCarousel {
    performers: Performer[];
}


export const PerformerCarousel:React.FC<PerformerCarousel>=({performers})=>{
    return(
        <div >
            <Carousel>
                <CarouselContent>
                    {performers.map((performer, idx) => {
                        return (
                            <CarouselItem  key={idx} className=''>
                                <PerformerCard
                                    img={performer.image}
                                    title={performer.searchString}
                                    desc={performer.nextEvent}/>
                            </CarouselItem>);
                    })}

                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )

}