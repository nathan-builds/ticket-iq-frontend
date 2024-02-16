import moment from 'moment-timezone';

/**
 * Convert string to est date, if not marked as 'Z' add it first
 * @param dateTimeString
 */
export const utcToESTDayMonthTime = (dateTimeString: string): { month: string, dayOfWeek: string, time: string, day:string } => {
    // Convert to EST (Eastern Standard Time);
    try {
        //some dates are formatted as 2024-05-25 and some are 2024-05-26T19:00, adding a Z to the first formatted
        //date causes an issues on mobile platforms for some reason, might look into this further at some point
        if (!dateTimeString.endsWith('Z') && dateTimeString.includes(':')) {
            dateTimeString += 'Z';
        }
        const inputMoment = moment(dateTimeString).tz('America/New_York');

        const month = inputMoment.format('MMM');
        const dayOfWeek = inputMoment.format('ddd');
        const time = inputMoment.format('h:mm A');
        const day = inputMoment.format('D');

        return { month, dayOfWeek, day, time };

    } catch (e) {
        console.log(`Error occurred with date string ${dateTimeString}`);
    }
    return{month:'Upcoming',dayOfWeek:'Upcoming',time:'Upcoming',day:'Upcoming'};

};
