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

    barcodes: string[] = JSON.parse(localStorage.getItem("Barcodes") ?? "[]");

    @query("#barcodes", true)
    barcodePreviews: HTMLDivElement;

    renderBarcodes() {
        for (let child of this.barcodePreviews.children) {
            (child as LitElement).requestUpdate();
        }
    }

    render() {
        this.barcodes = JSON.parse(localStorage.getItem("Barcodes") ?? "[]");

        return html`
        <div id="barcodes">
            ${map(this.barcodes, (barcode, index) => html`<barcode-preview index="${index}" barcode="${barcode}"></barcode-preview>`)}
            <new-barcode role="button" tabindex="0"></new-barcode>
        </div>
        `
    }
}
