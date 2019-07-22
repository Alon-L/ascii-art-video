import Settings from '../Settings';
import Canvas from '../canvas/Canvas';

const enum Color {
  outline = '#fff',
  background = '#232323',
  foreground = '#fff'
}

export default class Char {
  private compressed: CanvasRenderingContext2D;
  private readonly char: string;
  public pixels: Uint8ClampedArray;
  private readonly settings: Settings;

  constructor(settings: Settings, char: string) {
    this.char = char;
    this.settings = settings;
  }

  render() {
    const { fontWidth, fontHeight, fontFace, fontBlur, fontGamma, microWidth, microHeight, microPadding } = this.settings;

    const microWidthPadded = microPadding * 2 + microWidth;
    const microHeightPadded = microPadding * 2 + microHeight;

    const canvasWidth = Math.round(microWidthPadded / microWidth * fontWidth);
    const canvasHeight = Math.round(microHeightPadded / microHeight * fontHeight);

    const context = new Canvas(canvasWidth, canvasHeight).draw().context;

    context.fillStyle = Color.outline;
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    context.translate(canvasWidth / 2, canvasHeight / 2);
    context.fillStyle = Color.background;
    context.fillRect(-fontWidth / 2, -fontHeight / 2, fontWidth, fontHeight);

    context.translate(0, fontHeight / 4);
    context.fillStyle = Color.foreground;
    context.textAlign = 'center';
    context.font = `${fontHeight}px ${fontFace}`;

    for (let i = 0, m = 1, n = 1; i < fontBlur; [m, n] = [n, n + m]) {
      context.filter = `blur(${n}px)`;
      context.globalAlpha = (++i / fontBlur) ** fontGamma;
      context.fillText(this.char, 0, 0);
    }

    document.body.appendChild(context.canvas);

    this.compress(context.canvas, microWidthPadded, microHeightPadded);
    this.updateData();
  }

  compress(canvas: HTMLCanvasElement, width: number, height: number) {
    const context = new Canvas(width, height, 'high').draw().context;
    context.drawImage(canvas, 0, 0, width, height);
    this.compressed = context;
  }

  updateData() {
    this.pixels = this.compressed.getImageData(0, 0, this.compressed.canvas.width, this.compressed.canvas.height).data;
  }
}
