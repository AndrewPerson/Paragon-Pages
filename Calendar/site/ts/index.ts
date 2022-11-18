import { Init } from "https://paragon.pages.dev/js/paragon.js";
import { createCalendar } from "./create-calendar";

Init();

const addFilter = document.getElementById("add-filter") as HTMLSelectElement;
addFilter.value = "";

const filterTemplate = (document.getElementById("filter-template") as HTMLTemplateElement).content.firstElementChild!;
const filterContainer = document.getElementById("filter-tags");

let calendar = createCalendar();

let filter: string[] = [];

declare const window: typeof Window & {
    addFilter: (value: string, text: string) => void,
    removeFilter: (value: string) => void
}

window.addFilter = (value: string, text: string) => {
    if (!filter.includes(value)) {
        filter.push(value);

        var filterElement = filterTemplate.cloneNode(true) as HTMLElement;

        filterElement.querySelector(".filter-name")!.textContent = text;
        filterElement.dataset.filter = value;

        filterContainer?.appendChild(filterElement);

        addFilter.value = "";

        localStorage.setItem("Filter", JSON.stringify(filter));

        calendar.updateFilter(filter);
    }
}

window.removeFilter = (value: string) => {
    if (filter.includes(value)) {
        filter.splice(filter.indexOf(value), 1);

        filterContainer?.querySelector(`[data-filter="${value}"]`)?.remove();

        localStorage.setItem("Filter", JSON.stringify(filter));

        calendar.updateFilter(filter);
    }
}

for (let filterValue of JSON.parse(localStorage.getItem("Filter") ?? "[]")) {
    window.addFilter(filterValue, [...addFilter.options].find(x => x.value == filterValue)!.textContent!);
}