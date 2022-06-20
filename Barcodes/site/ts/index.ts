import "./elements";

import { Init, GetResource } from "https://paragon.pages.dev/js/paragon.js";

declare const window: Window & typeof globalThis & {
    studentId?: string
};

window.studentId = undefined;
Init().then(async () => {
    GetResource("userinfo", (userinfo) => {
        window.studentId = userinfo.studentId;
    });
});