'use client';
import React from 'react';
import { encodeURLString, formatLocalTime } from '@/utils/utils';
import { useRouter } from 'next/navigation';
import { Performer } from '@/utils/models';

export interface PerformerCardProps {
    performer: Performer;
    className?: string,

}

export const PerformerCard: React.FC<PerformerCardProps> = ({ performer, className }) => {
    //todo false is just defaulted here for TBD
    const { dayOfWeek, month, time, day } = formatLocalTime(performer?.nextEvent.date, false);
    const venue = performer.nextEvent.venue;
    const router = useRouter();

    //todo fix this so that its only done in one spot maybe?
    const onPerformerClickedHandler = () => {
        const performerName = encodeURLString(performer.performerName);
        router.push(`/results/${performerName}?slug=${performer.slug}`);
    };

    return (
        <div
            onClick={onPerformerClickedHandler}
            className={className||''}>
            <div className="rounded-lg border-transparents flex">
                <img src={performer.image}
                     className={'rounded-lg border-transparent object-cover transition-all hover:scale-105'}/>
            </div>
            <div className="font-semibold text-md lg:text-xl whitespace-nowrap overflow-hidden text-ellipsis">
                {performer.performerName}
            </div>
            <div className="whitespace-nowrap overflow-hidden text-ellipsis text-[#475569]">
                {`${month} ${day} - ${venue}`}
            </div>
        </div>
    );
};