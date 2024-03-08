import { Category, EventsMap, EventsResult, Production, Productions, VendorPartial } from '@/utils/models';
import { parse } from 'node-html-parser';

export class APIService {
    static baseURL = 'https://ticket-iq-production.up.railway.app';
    // static baseURL = 'http://localhost:7000';
    // how long a API request for data is cached
    static CACHE_TIME_SECONDS = 100;

    /**
     * Make request for all the home page suggestions
     */
    static getHomeSuggestions = async (): Promise<Category[]> => {
        const res = await fetch(`${APIService.baseURL}/home/suggest`, {
            next: { revalidate: APIService.CACHE_TIME_SECONDS }
        });
        const json = await res.json();
        return json['data'] as Category[];

    };
    /**
     * Convert the string to the correct format by replacing spaces. Then make a request to the
     * backend for all the given events for a performer
     * @param performer in form of Luke Combs
     */
    static getPerformerEvents = async (performer: string): Promise<EventsResult> => {
        let performerFormatted = performer.replaceAll(' ', '+');
        const res = await fetch(` ${APIService.baseURL}/events/find?performer=${performerFormatted}`, {
            next: { revalidate: APIService.CACHE_TIME_SECONDS }
        });
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


}