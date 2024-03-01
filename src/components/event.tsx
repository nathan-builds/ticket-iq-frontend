'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Production, Productions, TicketIQEvent, VendorPartial } from '@/utils/models';
import React, { useState } from 'react';
import { utcToESTDayMonthTime } from '@/utils/utils';
import { PuffLoader } from 'react-spinners';
import { APIService } from '@/services/apiService';
import { Vendor } from '@/components/vendor';


export interface EventProps {
    eventInfo: TicketIQEvent;
    includeFees: boolean;
}

export const Event: React.FC<EventProps> = ({ eventInfo, includeFees }) => {
    const { dayOfWeek, month, time, day } = utcToESTDayMonthTime(eventInfo.datetime_utc);
    const [loadingPrices, setLoadingPrices] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [productions, setProductions] = useState<Production[]>([]);


    /**
     * Gametime info doesnt require extra request right now, its in event info, add it to the productions
     * if its there
     * @param productions
     */
    const appendGametime = (productions: Production[]) => {
        const gametime = eventInfo.vendors
            .find(vendor => vendor.vendor.name === 'gametime');
        if (!gametime) {
            return;
        }

        const gametimeProd: Production = {
            minPrice: gametime.minPrice,
            priceWithFees: gametime.priceWithFees,
            displayName: 'Gametime',
            vendorName: 'gametime'
        };
        productions.push(gametimeProd);
    };


    /**
     * StubHub info doesnt require extra request right now, its in event info, add it to the productions
     * if its there
     * @param productions
     */

    const appendStubHub = (productions: Production[]) => {
        console.log(productions);
        const stubhub = eventInfo.vendors
            .find(vendor => vendor.vendor.name === 'stub_hub');
        if(!stubhub){
            return;
        }
        const stubHubProd:Production={
            minPrice:stubhub.minPrice,
            priceWithFees:stubhub.priceWithFees,
            displayName:stubhub.vendor.displayName,
            vendorName:stubhub.vendor.name
        }
        productions.push(stubHubProd);
    };

    /**
     * Only issue request if accordion is opened.
     * The request gets all the prices for a given event for each vendor
     */
    const onAccordionTriggerClickedHandler = async () => {
        // const stubHubEvent= eventInfo.vendors.find(e=>e.vendor.name==='stub_hub');
        // if(stubHubEvent){
        //     const data = await APIService.getStubHubEventPrice(stubHubEvent.url);
        // }
        // if (isOpen) {
        //     console.log('Was open no action taken');
        //     setIsOpen(!isOpen);
        //     return;
        // }
        // setIsOpen(!isOpen);
        // setLoadingPrices(true);
        // console.log('Making request for prices..');
        // const vendors = eventInfo.vendors.filter(event => event.productionID !== -1);
        // const productions = await APIService.getEventPrices(vendors);
        // appendGametime(productions);
        // appendStubHub(productions);
        // setProductions(productions);
        // setLoadingPrices(false);
        //
    };

    /**
     * Note have to find URL from eventInfo and line it up with production info, only way to do this right now
     */
    return (
        <div>
            <Accordion type="single" collapsible className="min-w-[350px] w-full ">
                <AccordionItem value="item-1">
                    <AccordionTrigger onClick={onAccordionTriggerClickedHandler}>
                        <div className="flex ">
                            <div className="w-[110px] flex flex-col items-start md:w-[150px] gap-1">
                                <span className="font-bold text-md">{`${month} ${day}`}</span>
                                <span className="text-sm">{`${dayOfWeek} - ${time}`}</span>
                            </div>
                            <div className="flex flex-col items-start gap-1 pl-5">
                                  <span
                                      className="font-bold text-md whitespace-nowrap overflow-hidden text-ellipsis max-w-[225px] md:max-w-[400px] lg:max-w-[275px] xl:max-w-[350px] ">
                                    {eventInfo.title}
                                </span>

                                <span
                                    className={' text-sm  whitespace-nowrap overflow-hidden text-ellipsis max-w-[225px] md:max-w-[500px] lg:max-w-[500px] xl:max-w-[700px]'}>
                                    {eventInfo.venue?.name}
                                </span>
                                <span
                                    className={' text-sm  whitespace-nowrap overflow-hidden text-ellipsis max-w-[225px] md:max-w-[500px] lg:max-w-[500px] xl:max-w-[700px]'}>
                                    {eventInfo.venue?.city}, {eventInfo?.venue?.state}
                                </span>
                            </div>
                        </div>
                    </AccordionTrigger>


                    {loadingPrices ?
                        <AccordionContent className="flex items-center justify-center">
                            <PuffLoader
                                size={50}/>
                        </AccordionContent> :
                        <AccordionContent className="flex flex-col gap-1 ">
                            {eventInfo.vendors.map((vendor, idx) => {
                                return (<Vendor
                                    key={idx}
                                    includeFees={includeFees}
                                    vendor={vendor}
                                    />);
                            })}
                        </AccordionContent>

                    }
                </AccordionItem>
            </Accordion>
        </div>
    );
};