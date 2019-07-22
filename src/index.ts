import Image from './image/Image';
import Chars from './char/Chars';
import Settings from './Settings';

const settings = new Settings();

const canvas: HTMLCanvasElement = document.querySelector('canvas.main-canvas');
const img: HTMLImageElement = document.querySelector('img');
document.querySelector('pre').style.fontSize = `${settings.previewHeight}px`;

canvas.width = img.width;
canvas.height = img.height;

window.onload = () => {
  /*const chars = new Chars(settings);
  chars.allChars();*/

  const image = new Image(settings, canvas, img);
  image.draw();
  image.updateData();
  image.grayscale();
  image.updateCanvas(image.pixels);
  image.createChunks();
};
