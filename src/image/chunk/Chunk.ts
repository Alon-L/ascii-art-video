const channels = 4;

export default class {
  private readonly width: number;
  private readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  pixelIndex(x: number, y: number) {
    return (this.width * (y - 1) + x - 1) * channels;
  }

  rect(x1: number, y1: number, x2: number, y2: number) {
    const inRange: number[] = [];
    for (let y = y1; y <= y2; y++) {
      for (let i = this.pixelIndex(x1, y); i < this.pixelIndex(x2 + 1, y); i += channels) {
        inRange.push(i);
      }
    }
    return inRange;
  }
}
