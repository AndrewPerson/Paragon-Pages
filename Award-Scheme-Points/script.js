import { Init, GetToken, RefreshToken, ShowNotification, CloseNotification } from "https://paragon.pages.dev/js/paragon.js";
import uhtml from "/uhtml.js";

const { render, html } = uhtml;

let participationData = GetCachedData();

if (participationData !== null) UpdateContentAutoFilter(participationData);

function ShowError() {
    CloseNotification("award-scheme-points-loader");
    ShowNotification("award-scheme-points-error", "Could not get award scheme points.");
}

window.UpdateFilter = (filter) => {
    if (participationData !== null && participationData !== undefined)
        UpdateContent(participationData, filter);
}

function UpdateContentAutoFilter(data) {
    let filter = document.getElementById("years").value;

    if (filter === undefined || filter === null || filter.trim() == "")
        UpdateContent(data, data[0].year);
    else
        UpdateContent(data, filter);
}

function UpdateContent(data, filter) {
    let years = new Set();

    for (let points of data) {
        if (!years.has(points.year)) years.add(points.year);
    }

    let awardSchemePoints = data.filter(points => points.category.trim().length != 0 && points.year == filter);

    render(document.querySelector("main"), html`
    <div class="header">
        <select id="years" oninput="window.UpdateFilter(this.value)">
            ${[...years.values()].map(year => html`
            <option value="${year}">
                ${year}
            </option>
            `)}
        </select>
    </div>

    <table id="points-table">
        <thead>
            <tr>
                <th>Activity</th>
                <th>Points</th>
            </tr>
        </thead>
        <tbody id="points">
            ${awardSchemePoints.map(points => points.category == "ZZ" ?
            html`
            <tr class="divider"></tr>
            <tr class="total">
                <td>Total Points</td>
                <td>${points.points}</td>
            </tr>
            ` :
            html`
            <tr>
                <td>${points.activity}</td>
                <td>${points.points}</td>
            </tr>
            `)}
        </tbody>
    </table>
    `);
}

function GetCachedData() {
    let participation = localStorage.getItem("Participation");

    return participation === null ? null : JSON.parse(participation);
}

async function GetData(token) {
    try {
        var response = await fetch("https://student.sbhs.net.au/api/details/participation.json", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    catch (e) {
        let participation = GetCachedData();

        if (participation === null)
            return {
                data: null,
                refresh: false
            };

        return {
            data: participation,
            refresh: false
        };
    }

    if (response.status == 401)
        return {
            data: null,
            refresh: true
        };

    if (response.status != 200)
        return {
            data: null,
            refresh: false
        };

    let text = await response.text();

    localStorage.setItem("Participation", text);

    return {
        data: JSON.parse(text),
        refresh: false
    };
}

async function RefreshData() {
    let refreshedToken = await RefreshToken();

    if (refreshedToken !== null) {
        let data = await GetData(refreshedToken);

        if (data.refresh) {
            ShowError();
        }
        else {
            participationData = data.data;

            if (participationData !== null && participationData !== undefined)
                UpdateContentAutoFilter(participationData);
            else
                ShowError();
        }
    }
    else ShowError();
}

Init().then(async () => {
    ShowNotification("award-scheme-points-loader", "Updating award scheme points...", true);

    let token = await GetToken();

    if (token !== null) {
        let data = await GetData(token);

        if (data.refresh) {
            await RefreshData();
        }
        else {
            if (participationData !== null && participationData !== undefined)
                UpdateContentAutoFilter(participationData);
            else
                await RefreshData();
        }
    }
    else {
        await RefreshData();
    }

    CloseNotification("award-scheme-points-loader");
});

try {
    navigator.serviceWorker.getRegistration("/sw.js").then(sw => sw.unregister());
}
catch (e) {
    
}