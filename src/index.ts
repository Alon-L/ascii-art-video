import Settings from './Settings';
import Video from './video';

window.onload = () => {
  const settings = new Settings();

  const canvas: HTMLCanvasElement = document.querySelector('canvas.main-canvas');
  const video: HTMLVideoElement = document.querySelector('video');
  const pre: HTMLPreElement = document.querySelector('pre');

  console.log(video.videoWidth, video.videoHeight);
  pre.style.fontSize = `${settings.previewHeight}px`;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  Video();
};
