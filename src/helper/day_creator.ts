import { Day } from "../day";

export const createDayClass = async (dayName: string): Promise<Day> => {
    const { DayClass } = await import(`../${dayName}`);
    return DayClass;
};