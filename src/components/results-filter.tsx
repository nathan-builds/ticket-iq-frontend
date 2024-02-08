'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import React from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Sort = {
    type: SortType,
    label: string
}

export type SortType = 'date' | 'price'


const sortTypes: Sort[] = [
    {
        type: 'date',
        label: 'Date'
    },
    {
        type: 'price',
        label: 'Price'
    }
];

interface ResultsFilterProps {
    filterChanged: (val: SortType) => void;
}


const ResultsFilter: React.FC<ResultsFilterProps> = (props) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');

    /**
     * If the current value is the same do nothing. If the value is different, set the new value
     * and alert the user that the filter has changed so that necessary components get the updated value
     * @param currentValue
     */
    const onFilterSelectionChange = (currentValue: string) => {
        console.log(`Current Value ${currentValue}`);
        if (currentValue === value) {
            return;
        }
        setValue(currentValue);
        setOpen(false);
        //alert user that filter changed
        props.filterChanged(currentValue as SortType);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[100px] h-[30px] justify-between rounded-2xl"
                >
                    {value
                        ? sortTypes.find((filter) => filter.type === value)?.label
                        : 'Date'}
                    <ChevronsUpDown className="ml-2 h-4 w-4  opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandGroup>
                        {sortTypes.map((filter) => (
                            <CommandItem
                                key={filter.type}
                                value={filter.type}
                                onSelect={onFilterSelectionChange}
                            >
                                <Check
                                    className={cn(
                                        'mr-2 h-4 w-4',
                                        value === filter.type ? 'opacity-100' : 'opacity-0'
                                    )}
                                />
                                {filter.type}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default ResultsFilter;