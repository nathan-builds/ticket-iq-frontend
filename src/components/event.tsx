'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Production, Productions, TicketIQEvent, VendorPartial } from '@/utils/models';
import React, { useState } from 'react';
import { formatLocalTime } from '@/utils/utils';
import { PuffLoader } from 'react-spinners';
import { APIService } from '@/services/apiService';
import { Vendor } from '@/components/vendor';
import { StubHubVendor } from '@/components/stub-hub-vendor';


export interface EventProps {
    eventInfo: TicketIQEvent;
    includeFees: boolean;
}

export const Event: React.FC<EventProps> = ({ eventInfo, includeFees }) => {
    const { dayOfWeek, month, time, day } = formatLocalTime(eventInfo.datetime_local, eventInfo.time_tbd);
    const [loadingPrices, setLoadingPrices] = useState(false);
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
        if (!stubhub) {
            return;
        }
        const stubHubProd: Production = {
            minPrice: stubhub.minPrice,
            priceWithFees: stubhub.priceWithFees,
            displayName: stubhub.vendor.displayName,
            vendorName: stubhub.vendor.name
        };
        productions.push(stubHubProd);
    };

    /**
     * Only issue request if accordion is opened.
     * The request gets all the prices for a given event for each vendor
     */
    const onAccordionTriggerClickedHandler = async () => {

        // if (isOpen) {
        //     setIsOpen(!isOpen);
        //     return;
        // }
        // setIsOpen(true);
        // const stubHubEvent = eventInfo.vendors.find(e => e.vendor.name === 'stub_hub');
        // if (stubHubEvent) {
        //     setLoadingPrices(true);
        //     const data = await APIService.getStubHubPrice(stubHubEvent.url);
        //     stubHubEvent.minPrice = data.minPrice;
        //     stubHubEvent.priceWithFees = data.priceWithFees;
        //     console.log(data);
        //     setLoadingPrices(false);
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
                    <AccordionTrigger>
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
                        //using stub hub separate temp component for now
                        <AccordionContent className="flex flex-col  ">
                            {eventInfo.vendors
                                .map((vendor, idx) => {
                                    return (vendor.vendor.name === 'stub_hub' ?
                                        <StubHubVendor key={idx} vendor={vendor} includeFees={includeFees}/> :
                                        <Vendor key={idx} vendor={vendor} includeFees={includeFees}/>);
                                })}
                        </AccordionContent>

                    }
                </AccordionItem>
            </Accordion>
        </div>
    );
};