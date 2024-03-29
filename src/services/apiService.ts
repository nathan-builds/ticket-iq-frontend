import {
    Category,
    EventsMap,
    EventsResult,
    LocalSuggestions,
    Production,
    Productions,
    VendorPartial
} from '@/utils/models';
import { count } from 'console';
import { parse } from 'node-html-parser';

export class APIService {

    static baseURL = (process.env.NODE_ENV === 'development' ? 'http://localhost:9002' : 'https://ticket-iq-production.up.railway.app');
    // static baseURL = 'http://localhost:7000';
    // how long a API request for data is cached
    static CACHE_TIME_SECONDS = 100;
    static getSiteMapDetails = async (): Promise<string[]> => {
        const url = `${APIService.baseURL}/sitemap`;
        const res = await fetch(url);
        const json = await res.json();
        return json['slugs'];

    };

    /**
     * Make request for all the home page suggestions, try to get GeoLocation based suggestions if we have the location
     */
    static getHomeSuggestions = async (): Promise<Category[]> => {

        let url = `${APIService.baseURL}/home/suggest`;


        const res = await fetch(url, {
            next: { revalidate: APIService.CACHE_TIME_SECONDS }
        });
        const json = await res.json();
        return json['data'] as Category[];

    };


    /**
     * Get local suggestions based on lat lon of user, if any of the params are missing here, cannot make request, return null to signify
     * no suggestions.
     * @param lat
     * @param lon
     * @param region
     * @param city
     * @param country
     */
    static getLocalSuggestions = async (lat?: string, lon?: string, region?: string, city?: string, country?: string): Promise<LocalSuggestions | null> => {
        //if we are missing params, we cannot make the request
        if (lat === 'unk' || lon === 'unk' || region === 'unk' || city === 'unk' || country === 'unk') {
            return null;
        }
        let url = `${APIService.baseURL}/home/local?lat=${lat}&lon=${lon}&city=${city}&country=${country}&region=${region}`;

        const res = await fetch(url, {
            next: { revalidate: APIService.CACHE_TIME_SECONDS }
        });

        const json = await res.json();

        //todo make this better temp fix for now
        const performers = json['performers'] as [];
        if (performers.length === 0) {
            return null;
        }

        return json as LocalSuggestions;

    };


    /**
     * Convert the string to the correct format by replacing spaces. Then make a request to the
     * backend for all the given events for a performer
     * @param performer in form of Luke Combs
     * @param slug there will be a slug if the item was selected and not manually typed
     */
    static getPerformerEvents = async (performer: string, slug: string | undefined): Promise<EventsResult> => {
        const res = await fetch(` ${APIService.baseURL}/events/find?performer=${performer}${slug ? `&slug=${slug}` : ''} `,
            { cache: 'no-store' });
        const json = await res.json();

        return {
            attractionName: performer,
            image: json['image'],
            events: json['events']
        };
    };

    static getStubHubPrice = async (longFormURL: string): Promise<{
        minPrice: number,
        priceWithFees: number
    }> => {
        const test = longFormURL.substring(longFormURL.indexOf('destination:') + 35);
        const res = await fetch(`${APIService.baseURL}/productions/stubhub?eventURL=${test}`);
        const json = await res.json();
        return json;
    };


    /**
     * Build a request string in th format of /vendors=sg:123456+vs:565423 each vendor short name
     * with the associated ID for the production
     *
     * Returns all productions with the price data
     * @param vendors all the vendors for a given event
     */
    static getEventPrices = async (vendors: VendorPartial[]): Promise<Production[]> => {

        if (vendors.length === 0) {
            return [];
        }
        let url = `${APIService.baseURL}/productions?vendors=`;

        //add spaces for every vendor unless its the last one
        for (let i = 0; i < vendors.length; i++) {
            url += `${vendors[i].vendor.shortName}:${vendors[i].productionID}`;
            if (i !== vendors.length - 1) {
                url += '+';
            }
        }
        console.log('Request sent for productions is ', url);
        const res = await fetch(url, {
            next: { revalidate: APIService.CACHE_TIME_SECONDS }
        });
        const json = await res.json();
        return json['productions'];
    };


    static logVendorSiteClickThrough = async (site: string) => {
        const data = {
            siteName: site
        };

        const url = `${APIService.baseURL}/log/site`;
        try {
            console.log(`Data is `, data);
            console.log(url);
            const res = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({ siteName: site }),
                    headers: { 'Content-Type': 'application/json' }
                }
            );

        } catch (e) {
            console.log('Could not perform log post.');
        }

    };


    static testGeoLocation = async (lat: string, lon: string, country: string) => {
        const data = {
            lat: lat,
            lon: lon,
            country: country
        };

        const url = `${APIService.baseURL}/test/geo`;
        try {
            console.log(`Data is `, data);
            console.log(url);
            const res = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({ lat: lat, lon: lon, country: country }),
                    headers: { 'Content-Type': 'application/json' }
                }
            );

        } catch (e) {
            console.log('Could not perform log post.');
        }

    };

    static sendContactForm = async (subject: string, fromEmail: string, message: string) => {

        const url = `${APIService.baseURL}/contact`;
        try {
            const res = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({
                        subject: subject,
                        fromEmail: fromEmail,
                        message: message
                    }),
                    headers: { 'Content-Type': 'application/json' }
                }
            );

        } catch (e) {
            console.log('Could not perform log post.');
        }


    };


}