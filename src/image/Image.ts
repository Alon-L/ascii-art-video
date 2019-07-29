import Settings from '../Settings';
import Chars from '../Chars';

export default class {
  private c: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private readonly image: HTMLImageElement;
  private readonly width: number;
  private readonly height: number;
  public pixels: ImageData;
  private settings: Settings;

  constructor(settings: Settings, c: HTMLCanvasElement, image: HTMLImageElement) {
    this.settings = settings;
    this.c = c;
    this.ctx = c.getContext('2d');
    this.image = image;
    this.width = this.c.width;
    this.height = this.c.height;
  }

  createChunks() {
    const { microWidth: CW, microHeight: CH, resolution } = this.settings;
    const canvas: HTMLCanvasElement = document.querySelector('canvas.text-canvas');
    const context = canvas.getContext('2d');
    //context.fillStyle = '#000';
    //context.rect(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#fff';
    context.font = '7px Consolas';
    let text = '';
    for (let ch = 1; ch + CH < this.height; ch += CH * resolution) {
      let lineText = '';
      for (let cw = 1; cw < this.width; cw += CW * resolution) {
        // Chunk
        let brightness = 0;
        for (let y = ch; y < ch + CH; y++) {
          for (let x = cw; x < cw + CW; x++) {
            const pixel = (this.width * (y - 1) + x - 1) * 4;
            const white = this.pixels.data[pixel];
            brightness += white;
          }
        }
        const brightnessAverage = Math.round(brightness / (CW * CH));
        lineText += Chars[brightnessAverage] || ' ';
      }
      context.fillText(lineText, 0, ch - 1);
      text += lineText + '\n';
    }
    document.querySelector('pre').innerText = text;
  }

  draw() {
    this.ctx.drawImage(this.image, 0, 0);
  }

  updateCanvas(data: ImageData) {
    this.ctx.putImageData(data, 0, 0);
  }

  grayscale() {
    const { data } = this.pixels;
    for (let i = 0; i < data.length; i += 4) {
      const luma = data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722;
      data[i] = data[i + 1] = data[i + 2] = luma;
      data[i + 3] = data[i + 3];
    }
  }

  updateData() {
    this.data = this.ctx.getImageData(0, 0, this.width, this.height);
  }

  set data(pixels: ImageData) {
    this.pixels = pixels;
  }
}
