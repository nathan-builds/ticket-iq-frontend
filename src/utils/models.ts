import { resolveIcon } from 'next/dist/lib/metadata/resolvers/resolve-icons';
import { Event } from '@/components/event';
import seatGeekIcon from '@/images/vendors/seat_geek.jpg';
import vividSeatsIcon from '@/images/vendors/vivid_seats.jpg';
import gametimeIcon from '@/images/vendors/gametime.jpg';
import { StaticImageData } from 'next/image';

export type NumMap<V> = { [index: number]: V }

export type TicketMasterSearchResponse = {
    _embedded: {
        attractions: Attraction[]
    }
}
export type Attraction = {
    name: string,
    images: Image[]
}

export type Image = {
    height: number,
    width: number,
    url: string,
    ration: string
}

export type EventsMap = { [index: string]: TicketIQEvent }

export type VendorName = 'seat_geek' | 'gametime' | 'vivid_seats'

export type Vendor = {
    name: VendorName,
    shortName:string,
    displayName: string
}

export type Productions={[index:string]:Production}
export type Production={
    vendorName:VendorName,
    displayName:string,
    minPrice:number,
    priceWithFees:number
}

export type VendorEvent = {
    productionID: number,
    vendor: Vendor,
    url: string,
    datetime_utc: string,
    datetime_est: string,
    title: string,
    minPrice: number,
    maxPrice: number,
    priceWithFees: number,
}
export type VendorPartial = Omit<VendorEvent,
    'datetime_utc' |
    'datetime_est' |
    'title'>


export type TicketIQEvent = {
    datetime_utc: string,
    minPrice: number,
    minPriceUrl: string,
    priceWithFees: number,
    title: string,
    venue: Venue,
    vendors: VendorPartial[]
}

export type Venue = {
    name: string,
    city: string,
    state: string
}

export type ImageMap = {
    [index in VendorName]: StaticImageData;
};

export const VendorImages: ImageMap = {
    seat_geek: seatGeekIcon,
    vivid_seats: vividSeatsIcon,
    gametime: gametimeIcon
};


export type Category = {
    title: string,
    performers: Performer[]
}

export type NextEvent = {
    venue: string,
    date: string
}

export type Performer = {
    performerName: string,
    searchString: string,
    nextEvent: NextEvent,
    image: string
}

export type EventsResult = {
    attractionName: string,
    image: TicketMasterImage;
    events: EventsMap
}
export type TicketMasterImage = {
    ratio: string,
    url: string,
    width: string,
    height: string,
    fallback: boolean
}
