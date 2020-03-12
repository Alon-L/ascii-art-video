import './style.css';
import Settings from './Settings';
import Video from './video/Video';
import Stream from './video/Stream';
import { CanvasElement } from './types';

const startBtn = document.getElementById('start');
let settings: Settings,
  mainCanvas: CanvasElement,
  textCanvas: CanvasElement,
  video: HTMLVideoElement,
  pre: HTMLPreElement;

window.onload = () => {
  settings = new Settings();

  mainCanvas = document.querySelector('canvas.main-canvas');
  textCanvas = document.querySelector('canvas.text-canvas');
  video = document.querySelector('video');
  pre = document.querySelector('pre');

  pre.style.fontSize = `${settings.previewHeight}px`;

  mainCanvas.width = textCanvas.width = video.videoWidth;
  mainCanvas.height = textCanvas.height = video.videoHeight;
};

startBtn.onclick = () => {
  const stream = new Stream(textCanvas);

  new Video(video, mainCanvas, settings, () => {
    stream.stopRecording();
  }).playVideo();

  stream.stream();
  stream.record();
};