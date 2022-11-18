import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { getData, sbhsCalendarToEvents, } from "./data";
import { showError } from "./notifications"

const calendarEl = document.getElementById("calendar");

export function createCalendar(mobileMaxAspectRatio: number = 1) {
    let filter: string[] = [];

    function getEvents(info: any, success: any, failure: any) {
        getData(info.start, info.end).then(data => {
            if (data === null) {
                showError();
                failure({
                    message: "Could not get calendar."
                });
                return;
            }

            success(sbhsCalendarToEvents(data).filter(e => {
                if (filter.length == 0) return true;

                let years = e.extendedProps!.years;

                if (years.length == 0) return filter.includes("other");
                return filter.reduce((prev, curr) => prev || years.includes(curr), false);
            }));
        });
    }

    let mobile = window.innerWidth / window.innerHeight < mobileMaxAspectRatio;

    let calendar = createRawCalendar(mobile, "", getEvents);

    window.addEventListener("resize", () => {
        let newMobile = window.innerWidth / window.innerHeight < mobileMaxAspectRatio;

        if (newMobile != mobile) {
            mobile = newMobile;
            calendar.destroy();

            calendar = createRawCalendar(mobile, calendar.view.type, getEvents);

            calendar.render();

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    calendar.updateSize();
                });
            });
        }
    });

    calendar.render();

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            calendar.updateSize();
        });
    });

    return {
        calendar: calendar,
        updateFilter(newFilter: string[]) {
            filter = newFilter;
            calendar.refetchEvents();
        }
    }
}

const mobileViews = ["timeGridDay", "listWeek"];
const desktopViews = ["dayGridMonth", "timeGridDay", "listWeek"];

function createRawCalendar(mobile: boolean, currentView: string, getEvents: any) {
    return new Calendar(calendarEl!, {
        plugins: [ dayGridPlugin, timeGridPlugin, listPlugin ],
        initialView: mobile ? (
            mobileViews.includes(currentView) ? currentView : mobileViews[0]
        ) : (
            desktopViews.includes(currentView) ? currentView : desktopViews[0]
        ),
        headerToolbar: {
            left: "prev,next today",
            center: mobile ? "" : "title",
            right: mobile ? mobileViews.join(",") : desktopViews.join(",")
        },
        buttonText: {
            today: "Today",
            month: "Month",
            day: "Day",
            list: "List"
        },
        dayHeaderFormat: {
            weekday: "short",
            month: "numeric",
            day: "numeric",
            omitCommas: true
        },
        nowIndicator: true,
        lazyFetching: true,
        stickyHeaderDates: true,
        expandRows: true,
        events: getEvents
    });
}