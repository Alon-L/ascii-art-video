import Settings from './Settings';
import Video from './video/Video';
import Stream from "./video/Stream";
import { CanvasElement } from './types';

window.onload = () => {
  const settings = new Settings();

  const mainCanvas: CanvasElement = document.querySelector('canvas.main-canvas');
  const textCanvas: CanvasElement = document.querySelector('canvas.text-canvas');
  const video: HTMLVideoElement = document.querySelector('video');
  const pre: HTMLPreElement = document.querySelector('pre');

  console.log(video.videoWidth, video.videoHeight);
  pre.style.fontSize = `${settings.previewHeight}px`;

  mainCanvas.width = textCanvas.width = video.videoWidth;
  mainCanvas.height = textCanvas.height = video.videoHeight;

  const stream = new Stream(textCanvas);
  Video(() => {
    stream.stopRecording();
  });
  stream.stream();
  stream.record();
};
