import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import { Barcodes } from "./barcodes";

//@ts-ignore
import plusSvg from "images/plus.svg";

//@ts-ignore
import textCss from "https://paragon.pages.dev/css/default/text.css";

//@ts-ignore
import newBarcodeCss from "./new-barcode.css";

declare const window: Window & typeof globalThis & {
    studentId?: string
};

@customElement("new-barcode")
export class NewBarcode extends LitElement {
    static styles = [textCss, newBarcodeCss];

    constructor() {
        super();

        this.addEventListener("click", this.CreateBarcode);

        this.addEventListener("keypress", e => {
            if (e.key == "Enter") {
                this.CreateBarcode();
            }
        });
    }

    CreateBarcode() {
        let barcodes: string[] = JSON.parse(localStorage.getItem("Barcodes") || "[]");

        barcodes.push(window.studentId ?? "test");

        localStorage.setItem("Barcodes", JSON.stringify(barcodes));

        (document.getElementById("barcodes") as Barcodes).requestUpdate();
    }

    render() {
        return html`
        ${plusSvg}
        <p>New Barcode</p>
        `
    }
}
