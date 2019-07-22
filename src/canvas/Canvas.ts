export default class {
  private readonly width: number;
  private readonly height: number;
  private readonly imageSmoothingQuality: ImageSmoothingQuality;
  private context2d: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;

  constructor(width: number, height: number, imageSmoothingQuality: ImageSmoothingQuality = 'medium') {
    this.width = width;
    this.height = height;
    this.imageSmoothingQuality = imageSmoothingQuality;
  }

  draw() {
    this.canvas = document.createElement('canvas');
    this.context2d = this.canvas.getContext('2d');
    this.setAttributes();
    return this;
  }

  setAttributes() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context2d.imageSmoothingQuality = this.imageSmoothingQuality;
  }

  get context() {
    return this.context2d;
  }
}
