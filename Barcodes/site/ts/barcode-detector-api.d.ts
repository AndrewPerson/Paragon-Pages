declare class BarcodeDetector {
    constructor(barcodeDetectorOptions?: BarcodeDetectorOptions = {});

    static getSupportedFormats(): Promise<BarcodeFormat[]> ;
  
    detect(image: ImageBitmapSource): Promise<DetectedBarcode[]>;
};

declare type BarcodeDetectorOptions = {
    formats: BarcodeFormat[];
};

declare type DetectedBarcode = {
    boundingBox: DOMRectReadOnly;
    rawValue: string;
    format: BarcodeFormat;
    cornerPoints: ReadonlyArray<Point2D>;
};

declare type Point2D = {
    x: number = 0.0;
    y: number = 0.0;
};

declare type BarcodeFormat = "aztec" | "code_128" | "code_39" | "code_93" | "codabar" | "data_matrix" | "ean_13" | "ean_8" | "itf" | "pdf417" | "qr_code" | "unknown" | "upc_a" | "upc_e";