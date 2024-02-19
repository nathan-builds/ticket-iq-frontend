import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import React from 'react';

export interface NavDropdownProps {
    dropdownItems: string[],
    title: string
    description: string,
    itemSelected: (value: string) => void;
}


/**
 * Displays items in dropdowns, seperates into two columns
 * @param title displayed text for dropdown
 * @param itemSelected called when item is selected, alert user to it
 * @param dropdownItems items that populate the dropdown
 * @constructor
 */
export const NavDropdown: React.FC<NavDropdownProps> = ({ title, itemSelected, dropdownItems, description }) => {
    const onItemClick = (e: any) => {
        console.log(e.target.innerText);
        itemSelected(e.target.innerText);
    };
    return (
        <DropdownMenu>

            <DropdownMenuTrigger>{title}</DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col">
                <div>
                    <DropdownMenuLabel>{description}</DropdownMenuLabel>
                </div>
                <div className="flex">
                    <div>
                        {dropdownItems.slice(0, dropdownItems.length / 2).map((item, idx) =>
                            <DropdownMenuItem className="hover:cursor-pointer" key={idx} onSelect={onItemClick}
                                              textValue={item}>{item}</DropdownMenuItem>)}
                    </div>
                    <div>
                        {dropdownItems.slice(dropdownItems.length / 2).map((item, idx) =>
                            <DropdownMenuItem className="hover:cursor-pointer" key={idx} onSelect={onItemClick}
                                              textValue={item}>{item}</DropdownMenuItem>)}
                    </div>
                </div>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};