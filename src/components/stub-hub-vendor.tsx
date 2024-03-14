'use client';

import { VendorPartial } from '@/utils/models';
import React, { useEffect, useState } from 'react';
import { APIService } from '@/services/apiService';
import { PuffLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';


export interface VendorProps {
    // productionURL: string,
    // productionDetails: Production,
    vendor: VendorPartial,
    includeFees: boolean;
}


/**
 * This is a temporary component until pricing details get worked out with StubHub API
 * @constructor
 */
export const StubHubVendor: React.FC<VendorProps> = ({ vendor, includeFees }) => {
    const [price, setPrice] =
        useState<{ minPrice: number, priceWithFees: number }>();
    const [loading, setIsLoading] = useState<boolean>(true);
    const logClickThrough = () => {
        APIService.logVendorSiteClickThrough(vendor.vendor.name);
    };


    useEffect(() => {
        async function getStubHubPrice() {
            setIsLoading(true);
            const data = await APIService.getStubHubPrice(vendor.url);
        console.log(data);
            setPrice(data);
            setIsLoading(false);
        }

        getStubHubPrice();
    }, []);

    return (
        <a className="justify-between flex items-center font-bold text-md lg:text-lg hover:bg-[#D9DCE1] h-[35px] "
           onClick={logClickThrough}
           href={vendor.url}
           target={'_blank'}>
            <div className="pl-2 flex items-start md:w-[150px]">{vendor.vendor.displayName}</div>
            {loading ?
                <PuffLoader size={30} className="mr-1"/> :
                <Button className="ml-auto w-[70px] mr-3 h-3/4" onClick={logClickThrough}>
                    {`\$${includeFees ? price?.priceWithFees : price?.minPrice}`}

                </Button>

            }

        </a>
    );
};