import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { computePosition, flip, shift, offset, arrow, hide, autoUpdate } from '@floating-ui/dom';

import { getData, sbhsCalendarToEvents, } from "./data";
import { showError } from "./notifications"

const calendarEl = document.getElementById("calendar");

export function createCalendar(tooltip: HTMLElement, mobileMaxAspectRatio: number = 1) {
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

    let calendar = createRawCalendar(mobile, "", getEvents, tooltip, tooltip.querySelector("#arrow")!);

    window.addEventListener("resize", () => {
        let newMobile = window.innerWidth / window.innerHeight < mobileMaxAspectRatio;

        if (newMobile != mobile) {
            mobile = newMobile;
            calendar.destroy();

            calendar = createRawCalendar(mobile, calendar.view.type, getEvents, tooltip, tooltip.querySelector("#arrow")!);

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

function createRawCalendar(mobile: boolean, currentView: string, getEvents: any, tooltipEl: HTMLElement, arrowEl: HTMLElement) {
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
        events: getEvents,
        eventDidMount: (info) => {
            let cleanup: (() => void) | null = null;
            info.el.addEventListener("pointerover", e => {
                if (info.view.type == "dayGridMonth" || info.view.type == "timeGridDay") {
                    if (cleanup !== null) {
                        cleanup();
                    }

                    tooltipEl.style.display = "block";
                    tooltipEl.querySelector("#tooltip-text")!.textContent = info.event.title;

                    cleanup = autoUpdate(info.el, tooltipEl, () => {
                        computePosition(info.el, tooltipEl, {
                            middleware: [
                                offset(6),
                                flip({ boundary: calendarEl!.querySelector(".fc-view-harness")! }),
                                shift({ boundary: calendarEl!.querySelector(".fc-view-harness")!, padding: 5 }),
                                arrow({ element: arrowEl }),
                                hide({ boundary: calendarEl!.querySelector(".fc-view-harness")! })
                            ]
                        }).then(({ x, y, placement, middlewareData }) => {
                            if ((middlewareData.hide?.referenceHidden ?? false)) {
                                tooltipEl.style.visibility = "hidden";
                            }
                            else {
                                tooltipEl.style.visibility = "visible";
                            }

                            tooltipEl.style.left = `${x}px`;
                            tooltipEl.style.top = `${y}px`;
                            
                            const staticSide = {
                                top: 'bottom',
                                right: 'left',
                                bottom: 'top',
                                left: 'right',
                            }[placement.split('-')[0]];

                            Object.assign(arrowEl.style, {
                                left: middlewareData.arrow?.x !== undefined ? `${middlewareData.arrow.x}px` : '',
                                top: middlewareData.arrow?.y !== undefined ? `${middlewareData.arrow.y}px` : '',
                                right: '',
                                bottom: '',
                                [staticSide!]: '-4px',
                            });
                        });
                    });
                }
            });

            info.el.addEventListener("pointerout", e => {
                if (info.view.type == "dayGridMonth" || info.view.type == "timeGridDay") {
                    if (cleanup !== null) {
                        cleanup();
                        tooltipEl.style.display = "none";
                        cleanup = null;
                    }
                }
            });
        }
    });
}