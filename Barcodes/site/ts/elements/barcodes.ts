import { html, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { live } from "lit/directives/live.js";

import "./barcode-preview";
import "./new-barcode";

//@ts-ignore
import barcodesCss from "./barcodes.css";

@customElement("barcodes-display")
export class Barcodes extends LitElement {
    static styles = [barcodesCss];

    //Have to support a string array due to legacy storage
    barcodes: ({ name: string, barcode: string } | string)[] = JSON.parse(localStorage.getItem("Barcodes") ?? "[]");

    render() {
        this.barcodes = JSON.parse(localStorage.getItem("Barcodes") ?? "[]");

        return html`
        <div id="barcodes">
            ${map(this.barcodes, (barcode, index) => {
                return html`<barcode-preview name="${typeof barcode == "string" ? barcode : barcode.name}" barcode="${typeof barcode == "string" ? barcode : barcode.barcode}" index="${index}"></barcode-preview>`;
            })}
            <new-barcode role="button" tabindex="0"></new-barcode>
        </div>
        `
    }
}
