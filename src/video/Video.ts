import Settings from '../Settings';
import Img from '../image/Image';
import { ImageElement } from '../types';

export default class Video {
  private readonly onVideoEnd: Function;
  private readonly settings: Settings;
  private readonly video: HTMLVideoElement;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  constructor(video: HTMLVideoElement, canvas: HTMLCanvasElement, settings: Settings, onVideoEnd: Function) {
    this.video = video;
    this.canvas = canvas;
    this.settings = settings;
    this.onVideoEnd = onVideoEnd;

    this.ctx = this.canvas.getContext('2d');
  }

  public playVideo() {
    const { video, settings } = this;

    video.muted = !settings.sound;
    video.volume = settings.volume;

    video.addEventListener('loadedmetadata', this.initCanvas.bind(this), false);
    video.addEventListener('timeupdate', this.drawFrame.bind(this), false);
    video.addEventListener('ended', this.onend.bind(this), false);

    video.play();
  }

  private initCanvas() {
    const { canvas, video } = this;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  }

  private drawFrame() {
    const { video, ctx, canvas } = this;

    video.pause();
    ctx.drawImage(video, 0, 0);
    canvas.toBlob(this.drawImage.bind(this), 'image/jpeg');
    if (video.currentTime < video.duration) {
      video.play();
    }
  }

  private revokeURL() {
    URL.revokeObjectURL(this.video.src);
  }

  private drawImage(blob: Blob) {
    const img: ImageElement = new Image();
    img.onload = this.revokeURL;
    img.srcObject = blob;
    this.frameChunks(img);
  }

  private frameChunks(img: HTMLImageElement) {
    const image = new Img(this.settings, this.canvas, img);
    image.draw();
    image.updateData();
    image.grayscale();
    image.updateCanvas(image.pixels);
    image.createChunks();
  }

  private download() {
    const a = document.createElement('a');
    document.body.append(a);
    a.href = this.video.src;
    a.download = 'video.mp4';
  }

  private onend() {
    this.download();
    this.onVideoEnd();
  }
}
