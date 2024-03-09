'use client';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useEffect, useState } from 'react';
import { Map, SeatGeekAutoCompleteResponse, TicketMasterSearchResponse } from '@/utils/models';
import { useRouter } from 'next/navigation';


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

    const [searchItems, setSearchItems] = useState<Map<SearchItem>>({});
    const [nextItemID, setNextItemID] = useState(0);
    const router = useRouter();

    useEffect(() => {
        addEnterKeyListener();
    }, []);


    /**
     * This key listener is responsible for handling when the enter key is pressed to use whatever text
     * is in the searchbar at the time.
     */
    const addEnterKeyListener = () => {
        const element: HTMLInputElement = document.querySelector('[data-test="search-input"]') as HTMLInputElement;
        element?.addEventListener('keydown', (evt) => {
            const keyEvent = evt as KeyboardEvent;
            if (keyEvent.key === 'Enter') {
                //set id, it doesn't matter here
                onSearchItemSelect({
                    id: 1,
                    name: element?.value
                },true);
            }
        });
    };


    /**
     * NOT USING TM right now
     * For the images, sort and find the smallest width.
     * @param keyword
     */
    const onUserSearchTicketMaster = async (keyword: string) => {
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
                    // setSearchItems(items);
                });
        } else {
            console.log('Search bar not live...');
        }
    };

    /**
     *Uses SeatGeek API to find suggested performers based on keyword. Additional logic was required here
     * Sometimes the APU returns empty performers for no reason. This function keeps track of all items that have
     * been searched since user started typing. As suggested items are received from the API only add it to the items
     * map IF it is not already in it. Use the nextID as the unique ID needed by the search bar.
     * @param keyword the string being searched
     */
    const onUserSearchSeatGeek = async (keyword: string): Promise<void> => {
        const url = seatGeekURL.replace('$SEARCH_STRING$', keyword);
        fetch(url)
            .then(res => res.json())
            .then(json => {
                let data = json as SeatGeekAutoCompleteResponse;
                let id = nextItemID;
                const newItems: Map<SearchItem> = {};

                for (let performer of data?.performers) {
                    //we already have this item in the search
                    if (searchItems[performer.name]) {
                        continue;
                    }
                    id += 1;
                    newItems[performer.name] = {
                        name: performer.name,
                        id: id
                    };
                }
                //sets next ID to be used on the next batch of items being suggested
                setNextItemID(id + 1);
                setSearchItems(prev => {
                    return {
                        ...prev,
                        ...newItems
                    };
                });
            }).catch(err => {
            console.log('Error with search bar');
        });
    };


    const formatResult = (item: SearchItem) => {
        return (
            <div className="flex gap-10 text-xl items-center">
                <div>{item.name}</div>
            </div>
        );
    };

    const onSearchItemSelect = (item: SearchItem, isManuallyEnteredSearch?:boolean) => {
        if (!item || item.id === -1) {
            return;
        }
        const performerName = item.name.replaceAll(' ', '+');
        router.push(`/results?performer=${performerName}&isStrSearch=${isManuallyEnteredSearch?'true':'false'}`);

    };


    return (<div>
        <ReactSearchAutocomplete<SearchItem>

            items={Object.values(searchItems)}
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
            inputDebounce={200}
            maxResults={5}
        >
        </ReactSearchAutocomplete>
    </div>);
};