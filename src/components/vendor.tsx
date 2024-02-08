import Image from 'next/image';
import React from 'react';
import { Production, VendorImages, VendorPartial } from '@/utils/models';

export interface VendorProps {
    productionURL: string,
    productionDetails: Production,
    includeFees: boolean;
}

export const Vendor: React.FC<VendorProps> = ({ productionDetails, includeFees, productionURL }) => {

    const vendorIcon = VendorImages[productionDetails.vendorName];

    return (
        <a className=" flex font-bold text-md lg:text-lg hover:bg-[#D9DCE1] " href={productionURL}>
            {/*<Image src={vendorIcon} alt={''}*/}
            {/*       className=" w-[32px] h-[32px] lg:w-[64px] lg:h-[50px] rounded-md "></Image>*/}
            <div></div>
            <div className="pl-2 flex flex-col items-start md:w-[150px]">{productionDetails.displayName}</div>
            <div className="ml-auto pr-1">{`\$${includeFees ? productionDetails.priceWithFees : productionDetails.minPrice}`}</div>
        </a>
    );
};