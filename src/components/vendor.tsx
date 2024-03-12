import Image from 'next/image';
import React from 'react';
import { Production, VendorPartial } from '@/utils/models';
import { APIService } from '@/services/apiService';
import { ExternalLink } from 'lucide-react';
import { ArrowTopRightIcon, OpenInNewWindowIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';


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
            <a className=" flex items-center  font-bold text-md lg:text-lg hover:bg-[#D9DCE1] h-[35px]  " href={vendor.url}
               target={'_blank'}
               onClick={logClickThrough}>
                <div></div>
                <div
                    className="pl-2 flex flex-col items-start md:w-[150px]">{vendor.vendor.displayName}{includeFees && vendor.vendor.name === 'vivid_seats' ? '*' : ''}</div>
                <Button className="ml-auto w-[70px] mr-3 h-3/4" onClick={logClickThrough}>
                    {`\$${includeFees ? vendor.priceWithFees : vendor.minPrice}`}
                </Button>

            </a>
        );
    }
;