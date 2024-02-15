


/**
 * Convert string to est date, if not marked as 'Z' add it first
 * @param dateTimeString
 */
export const utcToESTDayMonthTime=(dateTimeString: string):{ month: string, dayOfWeek: string, time: string }=>{
    // Convert to EST (Eastern Standard Time);
    if(!dateTimeString.endsWith('Z')){
        dateTimeString+='Z';
    }

    const inputDate = new Date(dateTimeString);
    const estOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'America/New_York',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const estFormatter = new Intl.DateTimeFormat('en-US', estOptions);
    const estDateString = estFormatter.format(inputDate);

    const [dayOfWeek,month,time] = estDateString.split(', ');

    return { month, dayOfWeek, time };

}
