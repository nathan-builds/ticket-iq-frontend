'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { APIService } from '@/services/apiService';
import { Location } from '@/utils/models';
import { MapPin } from 'lucide-react';


export interface LocationSearch {
    onLocationChange: (loc: Location) => void;
}

export const LocationSearch: React.FC<LocationSearch> = ({ onLocationChange }) => {

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState<Location>();
    const [locations, setLocations] = useState<Location[]>([]);

    const onSearchEntered = (e: any) => {
        getLocationSuggestions(e.target.value);
    };
    const getLocationSuggestions = async (query: string) => {
        const locations = await APIService.getCities(query);
        setLocations(locations);
    };

    // useEffect(() => {
    //     const getLocationSuggestions = async () => {
    //         const locs: { name: string }[] = await APIService.getCities(input);
    //         const testMap = locs.map(l => l.name) as string[];
    //         console.log(testMap);
    //
    //         setLocations(testMap);
    //     };
    //     getLocationSuggestions();
    // }, [input]);
    const onValueSelected = (selectedLocation: Location) => {
        onLocationChange(selectedLocation);
        setValue(selectedLocation);
        setOpen(false);
    };


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[170px] h-[35px] rounded-3xl text-sm pl-1 ml-1 mt-1"

                >
                    <MapPin height={18}/>
                    Change Location
                </Button>

            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search city..." onInput={onSearchEntered}/>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        <CommandItem/>
                        <CommandItem/>
                        {locations.map((loc, idx) => (
                            <CommandItem
                                key={idx}
                                value={`${loc.name}, ${loc.state_code}`}
                                onSelect={() => onValueSelected(loc)}
                            >
                                {`${loc.name}, ${loc.state_code}`}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};