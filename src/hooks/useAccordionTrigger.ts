// import { useState } from 'react';
// import { Productions, TicketIQEvent } from '@/utils/models';
// import { APIService } from '@/services/apiService';
//
// export const useAccordionTrigger = (eventInfo: TicketIQEvent) => {
//     const [loadingPrices, setLoadingPrices] = useState(true);
//     const [isOpen, setIsOpen] = useState<boolean>(false);
//     const [prod, setProductions] = useState<Productions>({});
//
//     /**
//      * Only issue request if accordion is opened
//      */
//     if (isOpen) {
//         setIsOpen(!isOpen);
//         return { loadingPrices, isOpen, prod };
//     }
//     setIsOpen(!isOpen);
//     setLoadingPrices(true);
//     const id = eventInfo.vendors.filter(event => event.productionID !== -1)[0].productionID;
//     return APIService.getEventPrices(id).then(res => {
//         setProductions(res);
//         setLoadingPrices(false);
//         ;
//         return { loadingPrices, isOpen, prod };
//     });
//
// };