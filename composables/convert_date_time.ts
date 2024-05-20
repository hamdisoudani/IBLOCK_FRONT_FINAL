import { format } from 'date-fns';
export const convertDateTime = (date: string): string => {
    try {
        const dateObj = new Date(date);
        if (dateObj.toString() === "Invalid Date") {
            return "-";
        }
        return format(dateObj, "PPpp");
    } catch (error) {
        return "-";
    }
}