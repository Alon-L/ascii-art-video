export interface CanvasElement extends HTMLCanvasElement{
  captureStream: (_: number) => MediaStream
}
