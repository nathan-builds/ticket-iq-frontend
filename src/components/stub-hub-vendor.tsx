'use client';

import { VendorPartial } from '@/utils/models';
import React, { useEffect, useState } from 'react';
import { APIService } from '@/services/apiService';
import { PuffLoader } from 'react-spinners';


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



    useEffect(() => {
        async function getStubHubPrice() {
            setIsLoading(true);
            const data = await APIService.getStubHubPrice(vendor.url, includeFees);
            setPrice(data);
            setIsLoading(false);
        }
        getStubHubPrice();
    }, []);

    return (
        <a className="justify-between flex font-bold text-md lg:text-lg hover:bg-[#D9DCE1] " href={vendor.url}
           target={'_blank'}>
            <div className="pl-2 flex items-start md:w-[150px]">{vendor.vendor.displayName}</div>
            {loading ?
                <PuffLoader size={30} className="mr-1"/> :
                <div
                    className="ml-auto pr-1">{`\$${includeFees ? price?.priceWithFees : price?.minPrice}`}
                </div>
            }

        </a>
    );
};