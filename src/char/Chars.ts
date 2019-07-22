import Char from './Char';
import { CharPixels, CharSums } from '../types';
import pixelIndex from '../pixels/pixelIndex';
import Settings from '../Settings';

export default class {
  public charPixels: CharPixels;
  public charSums: CharSums;
  private readonly settings: Settings;
  private test: any;

  constructor(settings: Settings, chars: CharPixels = {}) {
    this.settings = settings;
    this.charPixels = chars;
    this.test = {};
    this.charSums = {};
    for (const char in chars) {
      this.charSums[char] = 0;
    }
  }

  compareChars(x: number, y: number, white: number) {
    const { microPadding, microWidth } = this.settings;
    for (const char in this.charPixels) {
      this.charSums[char] += Math.abs(
        this.charPixels[char][pixelIndex(microPadding * 2 + microWidth, x + microPadding,
          y + microPadding)] - white
      );
    }
  }

  renderChar(character: string) {
    const char = new Char(this.settings, character);
    char.render();
    this.charPixels[character] = char.pixels;
  }

  allChars() {
    const chars = this.getChars();
    const charsArr = chars.split('');
    for (const char of charsArr) {
      this.renderChar(char);
    }
  }

  getChars() {
    return String.fromCharCode(
      ...range(0x20, 0x5f), // _!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^
      ...range(0x60, 0x7f), // `abcdefghijklmnopqrstuvwxyz{|}~
      ...range(0xa1, 0xa8), // ¡¢£¤¥¦§
      ...range(0xae, 0xb2), // ®¯°±
      0xa9, 0xab, 0xac, 0xb4, 0xb5, 0xb7, 0xbb, 0xbf, 0xd7, 0xf7, // ©«¬´µ·»¿×÷
      ...range(0x2018, 0x2023), // ‘’‚‛“”„‟†‡•
      0x2039, 0x203a, 0x2219, 0x221a, 0x221e // ‹›∙√∞
    );
  }
}

function* range(start = 0, stop = Infinity, step = 1) {
  for (let n = start; n < stop; n += step)
    yield n;
}
