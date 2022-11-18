import { EventInput } from "@fullcalendar/core";

import { GetToken, RefreshToken } from "https://paragon.pages.dev/js/paragon.js";
import { showLoader, closeLoader, showError } from "./notifications";
import { getYears } from "./get-years";

let callbacks: ((data: any) => void)[] = [];
let fetching = false;
export async function getData(start: Date, end: Date) {
    if (fetching) {
        return new Promise(resolve => {
            callbacks.push(resolve);
        });
    }

    fetching = true;

    showLoader();

    let token = await GetToken();

    if (token === null) {
        showError();

        fetching = false;

        callbacks.forEach(x => x(null));
        return null;
    }

    let data = await getRawData(start, end, token);

    if (data.refresh) {
        token = await RefreshToken();

        if (token === null) {
            showError();

            fetching = false;

            callbacks.forEach(x => x(null));
            return null;
        }

        data = await getRawData(start, end, token);
    }

    closeLoader();

    fetching = false;

    callbacks.forEach(x => x(data.data));
    return data.data;
}

async function getRawData(start: Date, end: Date, token: string) {
    try {
        let startYear = start.getFullYear().toString();
        let startMonth = (start.getMonth() + 1).toString().padStart(2, "0");
        let startDay = start.getDate().toString().padStart(2, "0");

        let endYear = end.getFullYear().toString();
        let endMonth = (end.getMonth() + 1).toString().padStart(2, "0");
        let endDay = end.getDate().toString().padStart(2, "0");

        let response = await fetch(`https://student.sbhs.net.au/api/diarycalendar/events.json?from=${startYear}-${startMonth}-${startDay}&to=${endYear}-${endMonth}-${endDay}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status == 401) {
            return {
                refresh: true,
                data: null
            };
        }

        if (response.status != 200) {
            return {
                refresh: false,
                data: null
            };
        }

        let data = await response.text();

        localStorage.setItem("Participation", data);

        return {
            refresh: false,
            data: JSON.parse(data)
        };
    }
    catch (e) {
        return {
            refresh: false,
            data: null
        };
    }
}

export function sbhsCalendarToEvents(data: any): EventInput[] {
    let events: EventInput[] = [];

    for (let dateInfo of data) {
        for (let item of dateInfo.items) {
            let years = getYears(item.title);

            let date = new Date(dateInfo.info.date);

            let start = item.data.start ?? item.time ?? null;
            let end = item.data.end ?? null;

            if (start === null) {
                let existingIndex = events.findIndex(e =>
                    e.end instanceof Date &&
                    e.title == item.title &&
                    e.end.getTime() == date.getTime()
                );

                let tomorrow = new Date(date);
                tomorrow.setDate(tomorrow.getDate() + 1);

                if (existingIndex == -1) {
                    events.push({
                        title: item.title,
                        start: date,
                        end: tomorrow,
                        allDay: true,
                        extendedProps: {
                            years
                        }
                    });
                }
                else {
                    events[existingIndex].end = tomorrow;

                    if (events[existingIndex].extendedProps === undefined) {
                        events[existingIndex].extendedProps = {};
                    }

                    events[existingIndex].extendedProps!.years = Object.assign(events[existingIndex].extendedProps!.years ?? {}, years);
                }
            }
            else if (end === null) {
                let startDate = new Date(date);
                let [startHours, startMinutes] = start.split(":");

                startDate.setHours(parseInt(startHours));
                startDate.setMinutes(parseInt(startMinutes));

                events.push({
                    title: item.title,
                    start: startDate,
                    extendedProps: {
                        years
                    }
                });
            }
            else {
                let startDate = new Date(date);
                let endDate = new Date(date);

                let [startHours, startMinutes] = start.split(":");
                let [endHours, endMinutes] = end.split(":");

                startDate.setHours(parseInt(startHours));
                startDate.setMinutes(parseInt(startMinutes));

                endDate.setHours(parseInt(endHours));
                endDate.setMinutes(parseInt(endMinutes));

                events.push({
                    title: item.title,
                    start: startDate,
                    end: endDate,
                    extendedProps: {
                        years
                    }
                });
            }
        }
    }

    return events;
}
