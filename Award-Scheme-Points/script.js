import { Init, GetToken, RefreshToken, ShowNotification, CloseNotification } from "https://paragon.pages.dev/js/paragon.js";

const yearsFilter = document.getElementById("years");
const points = document.getElementById("points");
const pointsTemplate = document.getElementById("points-template").content;
const total = document.getElementById("total");

localStorage.setItem("Participation", `[{"year":"2022","activity":"Academic Achievement S1","category":"01","points":"20","categoryName":"Academic","pointsCap":"30"},{"year":"2022","activity":"Water Polo","category":"02","points":"20","categoryName":"Summer GPS Sport","pointsCap":"35"},{"year":"2022","activity":"Fencing","category":"03","points":"20","categoryName":"Winter GPS sport","pointsCap":"35"},{"year":"2022","activity":"Athletics","category":"04","points":"15","categoryName":"GPS Athletics","pointsCap":"20"},{"year":"2022","activity":"Swimming Carnival Participation","category":"06","points":"5","categoryName":"Carnivals","pointsCap":"15"},{"year":"2022","activity":"Debating Coaching T1 T2 Year 9","category":"08","points":"10","categoryName":"Debating","pointsCap":"30"},{"year":"2022","activity":"Australian Informatics Olympiad - Intermediate - Gold","category":"10","points":"20","categoryName":"Academic Competitions","pointsCap":"30"},{"year":"2022","activity":"Geography Competition HD","category":"10","points":"10","categoryName":"Academic Competitions","pointsCap":"30"},{"year":"2022","activity":"Web development club workshop leader","category":"12","points":"15","categoryName":"Leadership","pointsCap":"30"},{"year":"2022","activity":"Makerspace - extra-curricular technical project","category":"16","points":"20","categoryName":"Self-Improvement Programs","pointsCap":"20"},{"year":"2022","activity":"Da Vinci Decathlon","category":"18","points":"5","categoryName":"Non-academic Competitions","pointsCap":"30"},{"year":"2022","activity":"International Mathematical Modelling Challenge","category":"18","points":"20","categoryName":"Non-academic Competitions","pointsCap":"30"},{"year":"2022","activity":"Tournament of Minds","category":"18","points":"5","categoryName":"Non-academic Competitions","pointsCap":"30"},{"year":"2022","activity":"Y10 gala day helper","category":"32","points":"3","categoryName":"School service - other","pointsCap":"60"},{"year":"2022","activity":"Multiple sports","category":"80","points":"13","categoryName":"High Spirit","pointsCap":"100"},{"year":"2022","activity":"Carry over","category":"99","points":"105","categoryName":"Carry over","pointsCap":"[unlimited]"},{"year":"2022","activity":"Total Points = 306","category":"ZZ","points":"306","categoryName":null,"pointsCap":null},{"year":"2021","activity":"Award Level: Gold","category":"","points":"0","categoryName":null,"pointsCap":null},{"year":"2021","activity":"Target 2021: 128","category":"","points":"128","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Academic Achievement S1","category":"01","points":"20","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Academic Achievement S2","category":"01","points":"20","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Academic Effort S2","category":"01","points":"20","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Waterpolo","category":"02","points":"20","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Fencing","category":"03","points":"20","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Athletics Participation (2 events)","category":"06","points":"2","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Cross Country Participation","category":"06","points":"5","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Swimming participation (2 events)","category":"06","points":"5","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Junior Stage Band S1","category":"07","points":"8","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Debating coaching T1","category":"08","points":"5","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Debating coaching T2 Yr 8","category":"08","points":"5","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Debating Eastside FED","category":"08","points":"8","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Debating GPS Team and coaching T3","category":"08","points":"12","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Australian Informatics Olympiad Intermediate - Silver","category":"10","points":"10","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Geography Competition HD","category":"10","points":"10","categoryName":null,"pointsCap":0},{"year":"2021","activity":"NCSS Challenge Advanced HD","category":"10","points":"10","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Exceptional reading","category":"16","points":"9","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Informatics workshop attendee","category":"16","points":"5","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Da Vinci Decathlon","category":"18","points":"5","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Matilda Musical Cast","category":"19","points":"30","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Record Report","category":"32","points":"2","categoryName":null,"pointsCap":0},{"year":"2021","activity":"95%+ whole day attendance","category":"70","points":"6","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Multiple sports","category":"80","points":"10","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Music Camp","category":"80","points":"5","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Carry over","category":"99","points":"87","categoryName":null,"pointsCap":0},{"year":"2021","activity":"Total Points = 309","category":"ZZ","points":"309","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Award Level: Bronze","category":"","points":"0","categoryName":null,"pointsCap":null},{"year":"2020","activity":"Target 2020: 128","category":"","points":"128","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Academic Achievement S1","category":"01","points":"20","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Academic Achievement S2","category":"01","points":"20","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Water Polo","category":"02","points":"20","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Fencing","category":"03","points":"20","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Swimming Carnival Participation","category":"06","points":"5","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Intermediate Stage Band S1","category":"07","points":"5","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Junior Stage Band S1","category":"07","points":"5","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Debating Chair audience","category":"08","points":"4","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Debating Coaching T1","category":"08","points":"5","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Debating coaching Y7 T2","category":"08","points":"5","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Debating Coaching Y7 T3","category":"08","points":"5","categoryName":null,"pointsCap":0},{"year":"2020","activity":"GPS Debating  Y7","category":"08","points":"7","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Geography Competition Prize","category":"10","points":"20","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Mathematics Competition HD","category":"10","points":"10","categoryName":null,"pointsCap":0},{"year":"2020","activity":"NCSS Challenge Advanced HD","category":"10","points":"10","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Web.Comp Advanced Perfect Score","category":"10","points":"20","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Junior Enrichment Class Enrichment Challenge","category":"15","points":"20","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Record Report (non sport)","category":"32","points":"1","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Perfect attendance S2","category":"70","points":"5","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Multiple sports","category":"80","points":"10","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Y7 Camp participant","category":"80","points":"5","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Winter sport selection (online)","category":"90","points":"1","categoryName":null,"pointsCap":0},{"year":"2020","activity":"Total Points = 183","category":"ZZ","points":"183","categoryName":null,"pointsCap":0}]`);

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
        let newRow = false;

        if (i < children.length) {
            row = children[i];
        }
        else {
            row = pointsTemplate.cloneNode(true);
            newRow = true;
        }

        row.querySelector(".name").textContent = filteredData[i].activity;
        row.querySelector(".points").textContent = filteredData[i].points;

        if (newRow) points.appendChild(row);
    }

    total.textContent = filteredData.reduce(
        (a, b) => a + parseInt(b.points),
        0
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