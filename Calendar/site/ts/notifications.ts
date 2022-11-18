import { ShowNotification, CloseNotification } from "https://paragon.pages.dev/js/paragon.js";

export function showLoader() {
    ShowNotification("calendar-loader", "Updating calendar...", true);
}

export function closeLoader() {
    CloseNotification("calendar-loader");
}

export function showError() {
    closeLoader();
    ShowNotification("calendar-error", "Could not get calendar.");
}