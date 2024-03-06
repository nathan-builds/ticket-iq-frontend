import Image from 'next/image';
import React from 'react';
import { Production,VendorPartial } from '@/utils/models';

export interface VendorProps {
    // productionURL: string,
    // productionDetails: Production,
    vendor:VendorPartial,
    includeFees: boolean;
}

export const Vendor: React.FC<VendorProps> = ({ vendor, includeFees }) => {
    return (
        <a className=" flex font-bold text-md lg:text-lg hover:bg-[#D9DCE1] " href={vendor.url} target={'_blank'}>
            {/*<Image src={vendorIcon} alt={''}*/}
            {/*       className=" w-[32px] h-[32px] lg:w-[64px] lg:h-[50px] rounded-md "></Image>*/}
            <div></div>
            <div className="pl-2 flex flex-col items-start md:w-[150px]">{vendor.vendor.displayName }{includeFees && vendor.vendor.name==='vivid_seats'?'*':'' }</div>
            <div className="ml-auto pr-1">{`\$${includeFees ? vendor.priceWithFees: vendor.minPrice}`}</div>
        </a>
    );
};