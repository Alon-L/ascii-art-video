export interface CanvasElement extends HTMLCanvasElement{
  captureStream: (_: number) => MediaStream;
}

export interface ImageElement extends HTMLImageElement {
  srcObject?: Blob;
}