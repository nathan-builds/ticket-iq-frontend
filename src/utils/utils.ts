/**
 * Convert string to est date, if not marked as 'Z' add it first
 * @param dateTimeString
 */
export const utcToESTDayMonthTime = (dateTimeString: string): { month: string, dayOfWeek: string, time: string } => {
    // Convert to EST (Eastern Standard Time);
    try {

        //some dates are formatted as 2024-05-25 and some are 2024-05-26T19:00, adding a Z to the first formatted
        //date causes an issues on mobile platforms for some reason, might look into this further at some point
        if (!dateTimeString.endsWith('Z') && dateTimeString.includes(':')) {
            dateTimeString += 'Z';
        }

        const inputDate = new Date(dateTimeString);
        const estOptions: Intl.DateTimeFormatOptions = {
            timeZone: 'America/New_York',
            month: 'short',
            day: 'numeric',
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };

        const estFormatter = new Intl.DateTimeFormat('en-US', estOptions);
        const estDateString = estFormatter.format(inputDate);

        const [dayOfWeek, month, time] = estDateString.split(', ');

        return { month, dayOfWeek, time };
    } catch (e) {
        console.log(`Error occurred with date string ${dateTimeString}`);
    }
    return{month:'Upcoming',dayOfWeek:'Upcoming',time:'Upcoming'};

};
