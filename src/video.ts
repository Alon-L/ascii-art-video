import Settings from "./Settings";
import Img from "./image/Image";

export default function() {
  const settings = new Settings();
  const video = document.querySelector('video');
  const canvas: HTMLCanvasElement = document.querySelector('canvas.main-canvas');
  const ctx = canvas.getContext('2d');

  function initCanvas() {
    canvas.width = this.videoWidth;
    canvas.height = this.videoHeight;
  }

  function drawFrame() {
    this.pause();
    ctx.drawImage(this, 0, 0);
    canvas.toBlob(drawImage, 'image/jpeg');
  }

  function revokeURL() {
    URL.revokeObjectURL(this.src);
  }

  function drawImage(blob: Blob) {
    const img = new Image();
    img.onload = revokeURL;
    // @ts-ignore
    img.srcObject = blob;
    frameChunks(img);
  }

  function frameChunks(img: HTMLImageElement) {
    const image = new Img(settings, canvas, img);
    image.draw();
    image.updateData();
    image.grayscale();
    image.updateCanvas(image.pixels);
    image.createChunks();
  }

  function onend() {
    console.log('Done!');
  }

  video.muted = !settings.sound;
  video.volume = settings.volume;

  video.addEventListener('loadedmetadata', initCanvas, false);
  video.addEventListener('timeupdate', drawFrame, false);
  video.addEventListener('ended', onend, false);

  video.play();
}
