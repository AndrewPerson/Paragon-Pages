import { Init, GetToken, RefreshToken, ShowNotification, CloseNotification } from "https://paragon.pages.dev/js/paragon.js";

const yearsFilter = document.getElementById("years");
const points = document.getElementById("points");
const pointsTemplate = document.getElementById("points-template").content;
const total = document.getElementById("total");

let data = JSON.parse(localStorage.getItem("Participation") ?? "[]");
let years = getUniqueYears(data)

renderYearsFilters(years);
renderData(data, years[0] ?? "");

window.updateFilter = (filter) => renderData(data, filter);

Init().then(() => getNewData().then(newData => {
    if (newData === null) {
        showError();
        return;
    }
    
    data = newData;
    renderData(data, yearsFilter.value);
}).catch(() => showError()).finally(() => CloseNotification("award-scheme-points-loader")));

function getUniqueYears(data) {
    return data.filter((item, i) => data.findIndex(x => x.year === item.year) === i).map(x => x.year);
}

function renderYearsFilters(years) {
    let children = yearsFilter.children;

    if (children.length > years.length) {
        for (let i = children.length - 1; i >= years.length; i--) {
            yearsFilter.removeChild(children[i]);
        }
    }

    for (let i = 0; i < years.length; i++) {
        if (i < children.length) {
            children[i].innerText = years[i];
        } else {
            let option = document.createElement("option");
            option.innerText = years[i];
            yearsFilter.appendChild(option);
        }
    }
}

function renderData(data, filter) {
    const filteredData = data.filter(points => points.category.trim().length != 0 && points.category != "ZZ" && points.year == filter);
    const children = points.children;

    if (filteredData.length == 0) {
        points.innerHTML = "";
        return;
    }

    if (children.length > filteredData.length) {
        for (let i = children.length - 1; i >= filteredData.length; i--) {
            points.removeChild(children[i]);
        }
    }

    for (let i = 0; i < filteredData.length; i++) {
        let row;

        if (i < children.length) {
            row = children[i];
        }
        else {
            row = pointsTemplate.cloneNode(true).firstElementChild;
            points.appendChild(row);
        }

        row.querySelector(".name").textContent = points.activity;
        row.querySelector(".points").textContent = points.points;
    }

    total.textContent = filteredData.reduce(
        (a, b) => a.points + b.points,
        filteredData[0]
    );
}

async function getNewData() {
    ShowNotification("award-scheme-points-loader", "Updating award scheme points...", true);

    let token = await GetToken();

    if (token === null) {
        showError();
        return null;
    }

    let data = await getData(token);

    if (data.refresh) {
        token = await RefreshToken();

        if (token === null) {
            showError();
            return null;
        }

        data = await getData(token);
    }

    if (data.data === null) {
        showError();
        return null;
    }

    return data.data;
}

async function getData(token) {
    try {
        let response = await fetch("https://student.sbhs.net.au/api/details/participation.json", {
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

function showError() {
    CloseNotification("award-scheme-points-loader");
    ShowNotification("award-scheme-points-error", "Could not get participation data.");
}

try {
    navigator.serviceWorker.getRegistration("/sw.js").then(sw => sw.unregister());
}
catch (e) {
    
}