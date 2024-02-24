
import { StaticImageData } from 'next/image';

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

export type VendorName = 'seat_geek' | 'gametime' | 'vivid_seats'|'stub_hub'

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
