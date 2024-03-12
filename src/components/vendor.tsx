import Image from 'next/image';
import React from 'react';
import { Production, VendorPartial } from '@/utils/models';
import { APIService } from '@/services/apiService';
import { ExternalLink } from 'lucide-react';
import { ArrowTopRightIcon, OpenInNewWindowIcon } from '@radix-ui/react-icons';


export interface VendorProps {
    // productionURL: string,
    // productionDetails: Production,
    vendor: VendorPartial,
    includeFees: boolean;
}

export const Vendor: React.FC<VendorProps> = ({ vendor, includeFees }) => {
        //send log to backend server, vercel is dumb and cant log for some reason
        const logClickThrough = async () => {
            console.log('Attempting log of site');
            APIService.logVendorSiteClickThrough(vendor.vendor.name);
        };

        return (
            <a className=" flex items-center  font-bold text-md lg:text-lg hover:bg-[#D9DCE1] " href={vendor.url}
               target={'_blank'}
               onClick={logClickThrough}>
                <div></div>
                <div
                    className="pl-2 flex flex-col items-start md:w-[150px]">{vendor.vendor.displayName}{includeFees && vendor.vendor.name === 'vivid_seats' ? '*' : ''}</div>
                <div className="ml-auto pr-1">{`\$${includeFees ? vendor.priceWithFees : vendor.minPrice}`}</div>
                <div className="mr-1 md:hidden">
                    <ArrowTopRightIcon
                        height={20}
                        width={20}
                        className="pr-1 w-[30px]"
                        href={vendor.url}
                        onClick={logClickThrough}/>
                </div>

            </a>
        );
    }
;