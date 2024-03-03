import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect } from 'react';
import { useReducerWithReduxDevtools } from 'next/dist/client/components/use-reducer-with-devtools';
import { useRouter, useSearchParams } from 'next/navigation';


export type FilterItem = {
    value: string,
    label: string
}


export interface CityFilter {
    alertUserCityChange: (city: string) => void;
    items: FilterItem[];
}

export const NO_CITY_FILTER = '';

export const CityFilter: React.FC<CityFilter> = ({ alertUserCityChange, items }) => {
    const DEFAULT_PLACEHOLDER = 'City';
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');
    const params = useSearchParams();
    const performerSlug = params.get('performer');

    /**
     * This is a hack thing for now to force state update, really need to rework how this actually works
     */
    useEffect(() => {
        setValue(NO_CITY_FILTER);
        alertUserCityChange(NO_CITY_FILTER);

    }, [performerSlug]);

    // console.log(`City filter is ${value}`);

    const test = (currentValue: string) => {
        //this indicates that the city has been unselected, placeholder goes back and all cities should be shown
        if (currentValue === value) {
            setValue(NO_CITY_FILTER);
            alertUserCityChange(NO_CITY_FILTER);
            return;
        }
        // there has been a change, set the new value, alert user to change
        setValue(currentValue);
        setOpen(false);
        alertUserCityChange(currentValue);
    };


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`h-[30px] justify-between rounded-2xl  ${value === NO_CITY_FILTER ? '' : 'text-white bg-primary'}`}
                >
                    {value
                        ? items.find((city) => city.value === value)?.label
                        : DEFAULT_PLACEHOLDER}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="City..."/>
                    <CommandEmpty>No cities found</CommandEmpty>
                    <ScrollArea className="h-72">
                        <CommandGroup>
                            {items.map((city) => (
                                <CommandItem
                                    key={city.value}
                                    value={city.value}
                                    onSelect={test}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value === city.value ? 'opacity-100' : 'opacity-0'
                                        )}
                                    />
                                    {city.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </ScrollArea>
                </Command>
            </PopoverContent>
        </Popover>
    );
};