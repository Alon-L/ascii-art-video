import Settings from '../Settings';
import chars from '../chars';

export default class {
  private c: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private readonly image: HTMLImageElement;
  private readonly width: number;
  private readonly height: number;
  public pixels: ImageData;
  private settings: Settings;
  //private chunks: number[][];

  constructor(settings: Settings, c: HTMLCanvasElement, image: HTMLImageElement) {
    this.settings = settings;
    this.c = c;
    this.ctx = c.getContext('2d');
    this.image = image;
    this.width = this.c.width;
    this.height = this.c.height;
    //this.chunks = [];
  }

  createChunks() {
    const { microWidth: CW, microHeight: CH, resolution } = this.settings;
    let text = '';
    // console.time('Gather chunks');
    for (let ch = 1; ch + CH < this.height; ch += CH * resolution) {
      /*const line: number[] = [];
      this.chunks.push(line);*/
      let lineText = '';
      for (let cw = 1; cw < this.width; cw += CW * resolution) {
        // Chunk
        //line.push((this.width * (ch - 1) + cw - 1) * 4);
        let brightness = 0;
        for (let y = ch; y < ch + CH; y++) {
          for (let x = cw; x < cw + CW; x++) {
            const pixel = (this.width * (y - 1) + x - 1) * 4;
            const white = this.pixels.data[pixel];
            brightness += white;
          }
        }
        const brightnessAverage = Math.round(brightness / (CW * CH));
        lineText += chars[brightnessAverage] || ' ';
      }
      text += lineText + '\n';
    }
    // console.timeEnd('Gather chunks');
    /*const canvas = document.createElement('canvas');
    canvas.getContext('2d').putImageData(this.pixels, 0, 0);
    document.body.appendChild(canvas);*/
    // console.time('Updating pre');
    document.querySelector('pre').innerText = text;
    // console.timeEnd('Updating pre');
  }

  /*drawChunks() {
    // console.time('Draw chunks');
    const { microHeight, microWidth } = this.settings;
    let text = '';
    for (const chunkLine of this.chunks) {
      let line = '';
      for (const chunk of chunkLine) {
        let brightness = 0;
        for (let i = chunk; i < microHeight * microWidth + chunk; i++) {
          const white = this.pixels.data[i];
          brightness += white;
        }
        const brightnessAverage = Math.round(brightness / (microWidth * microHeight));
        line += chars[brightnessAverage] || ' ';
      }
      text += `${line}\n`;
    }
    document.querySelector('pre').innerText = text;
    // console.timeEnd('Draw chunks');
  }*/

  draw() {
    //console.log(this.ctx.canvas.width, this.ctx.canvas.height);
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
    // console.log(this.width, this.height);
    this.data = this.ctx.getImageData(0, 0, this.width, this.height);
  }

  set data(pixels: ImageData) {
    this.pixels = pixels;
  }
}
