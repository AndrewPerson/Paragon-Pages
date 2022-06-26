import { Init } from "https://paragon.pages.dev/js/paragon.js"

Init();

window.updateCss = (css) => {
    window.parent.postMessage({
        command: "Register Skin",
        data: {
            name: "Custom Skin",
            css: css
        }
    }, "*");
}