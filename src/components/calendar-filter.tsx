import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { NO_CITY_FILTER } from '@/components/city-filter';

export const CalendarFilter = () => {

    const [date, setDate] = React.useState<Date | undefined>(new Date());

    const onDateSelect = (date: Date | undefined) => {
        setDate(date);
        console.log(date);
    };

    return (<div>
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className={`h-[30px] justify-between rounded-2xl`}
                >
                    <CalendarIcon height={16} width={16} className="pr-1"/>
                    Date
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    selected={date}
                    onSelect={onDateSelect}
                    mode="single"
                />
            </PopoverContent>
        </Popover>


    </div>);
};