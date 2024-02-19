'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog';
import { useState } from 'react';
import ticketIQIcon1 from '../images/logo/fulllogo_nobuffer.jpg';

/**
 * Temp alert for recent name change, only display this on initial landing
 * @constructor
 */
export const TempAlert=()=>{
    const [isOpen, setIsOpen]=useState<boolean>(true);
    const onDialogClosed=()=>{
        setIsOpen(false)
        localStorage.setItem('alerted','true')
    }
    if(typeof localStorage!=='undefined' &&localStorage.getItem('alerted')){
        return(<div></div>)
    }

    return(
    <Dialog open={isOpen} onOpenChange={onDialogClosed}>
        <DialogContent>
            <img src={ticketIQIcon1.src} className="pb-1.5 h-[50px] md:h-[60px]"/>
            <DialogHeader className='font-bold text-2xl'>Our name has changed!</DialogHeader>
            <DialogDescription className='text-xl'>
                We have recently changed to become your TicketHero! Soon ticket-iq.com will go away,
                and mytickethero.com will be our new home.
            </DialogDescription>
        </DialogContent>
    </Dialog>)
}