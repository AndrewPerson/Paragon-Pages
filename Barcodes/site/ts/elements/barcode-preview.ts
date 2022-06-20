import { html, LitElement, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";

declare const JsBarcode: ((canvas: HTMLCanvasElement, data: string, options: {
    displayValue: boolean
    margin: number
}) => void) | undefined;

import { ShowNotification } from "https://paragon.pages.dev/js/paragon.js";

import { Barcodes } from "./barcodes";
import { BarcodeOverlay } from "./barcode-overlay";
import { BarcodeScanner } from "./barcode-scanner";

//@ts-ignore
import fullscreenSvg from "images/fullscreen.svg";
//@ts-ignore
import downloadSvg from "images/download.svg";
//@ts-ignore
import binSvg from "images/bin.svg";
//@ts-ignore
import cameraSvg from "images/camera.svg";

//@ts-ignore
import imgCss from "https://paragon.pages.dev/css/default/img.css";
//@ts-ignore
import searchCss from "https://paragon.pages.dev/css/default/search.css";
//@ts-ignore
import barcodePreviewCss from "./barcode-preview.css";

@customElement("barcode-preview")
export class BarcodePreview extends LitElement {
    static styles = [imgCss, searchCss, barcodePreviewCss];

    @property()
    barcode: string;

    @property({ type: Number })
    index: number;

    @query("#download-link")
    downloadLink: HTMLAnchorElement;

    @query("#barcode", true)
    barcodeCanvas: HTMLCanvasElement;

    @query("#scan", true)
    scanButton: HTMLButtonElement;

    @query("#barcode-input")
    barcodeInput: HTMLInputElement;
    
    supportsBarcodeDetector: boolean = ("BarcodeDetector" in window);

    InputBarcode(e: InputEvent) {
        let barcode = (e.target as HTMLInputElement).value;

        let barcodes: string[] = JSON.parse(localStorage.getItem("Barcodes") || "[]");

        barcodes.splice(this.index, 1, barcode);

        localStorage.setItem("Barcodes", JSON.stringify(barcodes));

        (document.getElementById("barcodes") as Barcodes).requestUpdate();
    }

    Show() {
        if (this.barcode == "") {
            ShowNotification("cant-open-barcode", "You must enter a barcode first!");
            return;
        }

        let barcodeOverlay = document.getElementById("barcode-overlay") as BarcodeOverlay;
        barcodeOverlay.style.display = "block";
        barcodeOverlay.barcode = this.barcode;
    }

    Delete() {
        if (!confirm(`Do you want to delete ${this.barcode.trim() == "" ? "this empty barcode" : `the barcode for ${this.barcode}`}?`)) return;

        let barcodes: string[] = JSON.parse(localStorage.getItem("Barcodes") || "[]");

        barcodes.splice(this.index, 1);

        localStorage.setItem("Barcodes", JSON.stringify(barcodes));

        (document.getElementById("barcodes") as Barcodes).requestUpdate();
    }

    async Scan() {
        let barcode = await BarcodeScanner.Scan();
        
        this.barcode = barcode;
        this.barcodeInput.value = barcode;

        let barcodes: string[] = JSON.parse(localStorage.getItem("Barcodes") || "[]");

        barcodes.splice(this.index, 1, barcode);

        localStorage.setItem("Barcodes", JSON.stringify(barcodes));
    }

    updated() {
        this.barcodeInput.value = this.barcode;
        
        if (this.barcode == "") {
            this.barcodeCanvas.style.display = "none";
        }
        else {
            if (typeof JsBarcode === "function") {
                this.barcodeCanvas.removeAttribute("style");
                JsBarcode(this.barcodeCanvas, this.barcode, {
                    displayValue: false,
                    margin: 0
                });

                let url = this.barcodeCanvas.toDataURL("image/png");

                if (this.downloadLink === null) return;

                this.downloadLink.href = url;
                this.downloadLink.download = `${this.barcode} Barcode.png`;
            }
        }
    }

    render() {
        return html`
        <div class="barcode-container" tabindex="0">
            <canvas id="barcode" width="20" height="20"></canvas>

            <div class="button-container">
                <button class="preview-option" title="Show" @click="${this.Show}">${fullscreenSvg}</button>
                <a id="download-link" class="preview-option" title="Download">${downloadSvg}</a>
                <button class="preview-option" title="Delete" @click="${this.Delete}">${binSvg}</button>
            </div>
        </div>

        <div class="barcode-input-container">
            <input id="barcode-input" type="search" value="${this.barcode}" @input="${this.InputBarcode}">
            ${this.supportsBarcodeDetector ? html`<button title="scan" id="scan" @click="${this.Scan}">
                ${cameraSvg}
            </button>` : nothing}
        </div>
        `
    }
}
