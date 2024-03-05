'use client';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { ChangeEvent, KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { SeatGeekAutoCompleteResponse, TicketMasterSearchResponse } from '@/utils/models';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const apiKey = 'p5Da9bnXsBrs5a00fJw8oTJM9GSffNDw';
const URL = 'https://app.ticketmaster.com/discovery/v2/suggest?apikey=p5Da9bnXsBrs5a00fJw8oTJM9GSffNDw&keyword=$SEARCH_STRING$&locale=*';
const seatGeekURL = 'https://api.seatgeek.com/2/performers?q=$SEARCH_STRING$&client_id=Mzc2MTA4MjB8MTY5OTkxMjQ2OC45MTQ4OTE';
const isLive = true;

export interface SearchBarProps {
    color: string,
    height: number,
    borderRadius: number,
}

interface SearchItem {
    id: number,
    name: string,
}


export const Searchbar: React.FC<SearchBarProps> = (props) => {

    const [searchItems, setSearchItems] = useState<SearchItem[]>([]);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const router = useRouter();



    /**
     * For the images, sort and find the smallest width
     * @param keyword
     */
    const onUserSearch = async (keyword: string) => {
        const url = URL.replace('$SEARCH_STRING$', keyword);
        if (isLive) {
            fetch(url)
                .then(res => res.json())
                .then(json => {
                    let data = json as TicketMasterSearchResponse;
                    let id = 0;

                    const items: SearchItem[] = data._embedded?.attractions?.map(item => {
                        id += 1;
                        return {
                            id: id,
                            name: item.name
                        };
                    });
                    setSearchItems(items);
                });
        } else {
            console.log('Search bar not live...');
        }
    };

    const onUserSearchSeatGeek = async (keyword: string): Promise<void> => {
        const url = seatGeekURL.replace('$SEARCH_STRING$', keyword);
        fetch(url)
            .then(res => res.json())
            .then(json => {
                let data = json as SeatGeekAutoCompleteResponse;
                let id = 0;
                const items: SearchItem[] = data?.performers?.map(performer => {
                    id += 1;
                    return {
                        name: performer.name,
                        id: id
                    };
                });
                setSearchItems(items);
            });
    };


    const formatResult = (item: SearchItem) => {
        return (
            <div className="flex gap-10 text-xl items-center">
                {/*<div className="relative h-[48px] w-[48px]">*/}
                {/*    <Image src={item.image} alt={''} fill*/}
                {/*           className="border-1 rounded-lg"/>*/}
                {/*</div>*/}
                <div>{item.name}</div>
            </div>
        );
    };

    const onSearchItemSelect = (item: SearchItem) => {
        if (!item || item.id === -1) {
            return;
        }
        const performerName = item.name.replaceAll(' ', '+');
        router.push(`/results?performer=${performerName}`);

    };



    return (<div >
        <ReactSearchAutocomplete<SearchItem>

            items={searchItems}
            styling={{
                backgroundColor: '#ffffff',
                color: '#000000',
                border: '1px solid #cdcdcd',
                height: `${props.height}px`,
                borderRadius: `${props.borderRadius}px`,
                placeholderColor: '#000000',
                iconColor: '#15AB99'
            }}
            placeholder={'Find Performer'}
            className="search"
            onSearch={onUserSearchSeatGeek}
            formatResult={formatResult}
            onSelect={onSearchItemSelect}
            autoFocus={true}
            inputDebounce={175}
            maxResults={5}
        >
        </ReactSearchAutocomplete>
    </div>);
};