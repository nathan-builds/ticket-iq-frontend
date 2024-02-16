'use client'
import Image, { StaticImageData } from 'next/image';

import image1 from '../images/head_heart.jpg';
import React from 'react';
import { NextEvent } from '@/utils/models';
import {  utcToESTDayMonthTime } from '@/utils/utils';
import { useRouter } from 'next/navigation';

export interface PerformerCardProps {
    img: string;
    title: string,
    desc: NextEvent
}

export const PerformerCard: React.FC<PerformerCardProps> = (props) => {
    const { dayOfWeek, month, time } = utcToESTDayMonthTime(props.desc?.date);
    const venue = props.desc.venue;
    const router = useRouter();

    const onPerformerClickedHandler=()=>{
        const performerName = props.title.replaceAll(' ', '+');
        router.push(`/results?performer=${performerName}`);

    }

    return (
        <div
            onClick={onPerformerClickedHandler}
            className="flex pl-2 flex-col min-h-[175px] min-w-[150px] max-w-[150px]  lg:min-h[450px] lg:min-w-[200px] hover:cursor-pointer z-0 ">
            <div className="rounded-lg border-transparents ">
                <img src={props.img} className={'rounded-lg border-transparent object-cover transition-all hover:scale-105'}/>
            </div>
            <div className="font-semibold text-md lg:text-xl whitespace-nowrap overflow-hidden text-ellipsis">
                {props.title}
            </div>
            <div className="whitespace-nowrap overflow-hidden text-ellipsis text-[#475569]">
                {`${month?? 'Upcoming'} - ${venue}`}
            </div>
        </div>
    );
};