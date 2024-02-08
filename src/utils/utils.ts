import { NumMap } from '@/utils/models';

const months: NumMap<string> = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Sep',
    11: 'Nov',
    12: 'Dec'
};

const days: NumMap<string> = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat'
};

/**
 * Convert a date string in format '6/3/2024, 10:00:00 PM' to Jun 3
 * @param date the date to convert
 */

export const getMonthDayString = (dateString: string): string => {
    const date = new Date(dateString);
    const month = date.getMonth();
    const day = date.getDate();

    return `${months[month]} ${day}`;

};

export const getDayOfWeekTimeString = (dateString: string): string => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    const convertedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
    return `${days[dayOfWeek]} - ${convertedTime.replace(' ', '')}`;
};

/**
 * converts UTC to est, if the string already has a Z at the end do not append it
 * @param utc
 */
export const convertUTCToLocalEST = (utc: string): string => {
    let utcDate=undefined;
    if(utc.charAt(utc.length-1)!=='Z'){
        utcDate=new Date(utc+'Z');
    }else{
        utcDate = new Date(utc); // 'Z' indicates UTC
    }

    // Convert to Eastern Standard Time (EST)
    return utcDate.toLocaleString('en-US', {
        timeZone: 'America/New_York' // Eastern Standard Time
    });
};
