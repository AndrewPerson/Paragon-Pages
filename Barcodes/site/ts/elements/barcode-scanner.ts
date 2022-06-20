import { html, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";

//@ts-ignore
import cameraSvg from "images/camera.svg";

//@ts-ignore
import barcodeScannerCss from "./barcode-scanner.css";

@customElement("barcode-scanner")
export class BarcodeScanner extends LitElement {
    static styles = [barcodeScannerCss];

    @query("#camera", true)
    cameraVideo: HTMLVideoElement;

    barcodeDetector: BarcodeDetector = new BarcodeDetector({ formats: ["code_128"] });

    barcodeResolve: (value: string | PromiseLike<string>) => void;

    static async Scan(): Promise<string> {
        let scanner = document.createElement("barcode-scanner") as BarcodeScanner;
        document.body.appendChild(scanner);

        let result = await scanner.Scan();

        scanner.remove();

        return result;
    }

    constructor() {
        super();

        this.Scan();
    }

    Scan(): Promise<string> {
        return new Promise(async (resolve, reject) => {
            let stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: { ideal: 'environment' }
                },
                audio: false
            }).catch(() => reject());

            if (stream === undefined) return;

            this.cameraVideo.srcObject = stream;
            await this.cameraVideo.play();

            this.barcodeResolve = resolve;
        });
    }

    async ResolveScan() {
        let barcodes = await this.barcodeDetector.detect(this.cameraVideo);

        this.barcodeResolve(barcodes[0].rawValue);
    }

    render() {
        return html`
        <video id="camera"></video>
        <button title="Scan" class="scan" @click="${this.ResolveScan}">
            ${cameraSvg}
        </button>
        `;
    }
}