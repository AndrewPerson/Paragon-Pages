import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";

//@ts-ignore
import barcodeOverlayCss from "./barcode-overlay.css";

declare const JsBarcode: ((canvas: HTMLCanvasElement, data: string, options: {
    displayValue: boolean
    margin: number
}) => void) | undefined;

function Debounce(this: unknown, func: (...args: any[]) => void, timeout: number) {
    let timer: number;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

@customElement("barcode-overlay")
export class BarcodeOverlay extends LitElement {
    static styles = [barcodeOverlayCss];

    @property()
    barcode?: string;

    @query("#barcode-canvas")
    canvas: HTMLCanvasElement | null;

    @query("#point1")
    point1: HTMLElement | null;

    @query("#point2")
    point2: HTMLElement | null;

    rect: DOMRect = this.getBoundingClientRect();

    draggedElement: HTMLElement | null = null;

    dragging: boolean = false;

    Resize = Debounce(() => {
        this.rect = this.getBoundingClientRect();
    }, 300).bind(this);

    DragPoint = ((e: PointerEvent) => {
        if (this.draggedElement == null) return;

        e.preventDefault();

        if (!this.dragging) {
            this.dragging = true;

            let x = (e.clientX - this.rect.left) / this.rect.width * 100;
            let y = (e.clientY - this.rect.top) / this.rect.height * 100;

            x = Math.max(0, Math.min(100, x));
            y = Math.max(0, Math.min(100, y));

            this.draggedElement.style.left = `${x}%`;
            this.draggedElement.style.top = `${y}%`;

            this.SetBarcodePosition();

            this.dragging = false;
        }
    }).bind(this);

    constructor() {
        super();

        this.addEventListener("click", this.Close);
        this.addEventListener("pointerup", this.EndDrag);

        document.addEventListener("pointermove", this.DragPoint);

        window.addEventListener("resize", this.Resize);
    }

    createRenderRoot() {
        let shadowRoot = super.createRenderRoot();
        shadowRoot.addEventListener("click", e => e.stopPropagation());

        return shadowRoot;
    }

    disconnectedCallback() {
        document.removeEventListener("pointermove", this.DragPoint);
        window.removeEventListener("resize", this.Resize);
    }

    Close(e: Event) {
        this.EndDrag();
        this.style.display = "none";

        e.stopPropagation();
    }

    StartDrag(e: PointerEvent) {
        e.preventDefault();

        this.draggedElement = e.target as HTMLElement;

        this.style.cursor = "move";
    }

    EndDrag() {
        this.draggedElement = null;
        this.style.removeProperty("cursor");

        this.SaveBarcodePosition();
    }

    MovePointKeys(e: KeyboardEvent) {
        let point = e.target as HTMLElement;

        let x = parseFloat(point.style.left.substring(0, point.style.left.length - 1) || "0");
        let y = parseFloat(point.style.top.substring(0, point.style.top.length - 1) || "0");

        if (e.key == "ArrowLeft") {
            x -= 2;
            e.preventDefault();
        }
        else if (e.key == "ArrowRight") {
            x += 2;
            e.preventDefault();
        }
        else if (e.key == "ArrowUp") {
            y -= 2;
            e.preventDefault();
        }
        else if (e.key == "ArrowDown") {
            y += 2;
            e.preventDefault();
        }

        x = Math.max(0, Math.min(100, x));
        y = Math.max(0, Math.min(100, y));

        point.style.left = `${x}%`;
        point.style.top = `${y}%`;

        this.SetBarcodePosition();
        this.SaveBarcodePosition();
    }

    SetBarcodePosition() {
        if (this.canvas === null) return;

        let x1 = parseFloat(this.point1?.style.left.substring(0, this.point1?.style.left.length - 1) || "0");
        let y1 = parseFloat(this.point1?.style.top.substring(0, this.point1?.style.top.length - 1) || "0");

        let x2 = parseFloat(this.point2?.style.left.substring(0, this.point2?.style.left.length - 1) || "0");
        let y2 = parseFloat(this.point2?.style.top.substring(0, this.point2?.style.top.length - 1) || "0");
    
        let maxX = Math.max(x1, x2);
        let minX = Math.min(x1, x2);

        let maxY = Math.max(y1, y2);
        let minY = Math.min(y1, y2);

        this.canvas.style.left = `${minX}%`;
        this.canvas.style.top = `${minY}%`;

        this.canvas.style.width = `${maxX - minX}%`;
        this.canvas.style.height = `${maxY - minY}%`;
    }

    RenderBarcode() {
        if (this.draggedElement !== null) return;
        if (this.canvas === null) return;

        if (this.barcode !== undefined && typeof JsBarcode === "function") {
            JsBarcode(this.canvas, this.barcode, {
                displayValue: false,
                margin: 0
            });
        }
    }

    SaveBarcodePosition() {
        if (this.point1 === null) return;
        if (this.point2 === null) return;

        localStorage.setItem("Barcode Points",
                             JSON.stringify([
                                 this.point1.style.left,
                                 this.point1.style.top,
                                 this.point2.style.left,
                                 this.point2.style.top
                             ]));
    }

    updated() {
        this.SetBarcodePosition();
        this.RenderBarcode();

        this.rect = this.getBoundingClientRect();
    }

    render() {
        let storedPoints = localStorage.getItem("Barcode Points");

        let points: string[] = ["10%", "10%", "90%", "50%"];

        if (storedPoints) points = JSON.parse(storedPoints);

        return html`
        <div id="point1" style="left: ${points[0]}; top: ${points[1]};" tabindex="0" @keydown="${this.MovePointKeys}" @pointerdown="${this.StartDrag}"></div>
        <div id="point2" style="left: ${points[2]}; top: ${points[3]};" tabindex="0" @keydown="${this.MovePointKeys}" @pointerdown="${this.StartDrag}"></div>

        <canvas id="barcode-canvas" style="top: 20%; left: 20%; width: 60%; height: 20%;"></canvas>
        `;
    }
}