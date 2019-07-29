import { CanvasElement } from "../types";

export default class {
  private canvas: CanvasElement;
  private streamer: MediaStream;
  private recorder: MediaRecorder;
  private readonly frames: Blob[];
  private blob: Blob;

  constructor(canvas: CanvasElement) {
    this.canvas = canvas;
    this.frames = [];
  }

  stream() {
    this.canvas.getContext('2d');
    this.streamer = this.canvas.captureStream(30);
    console.log(this.streamer);
  }

  record() {
    this.recorder = new MediaRecorder(this.streamer);
    this.recorder.start();
    this.recorder.ondataavailable = this.saveFrame.bind(this);
    this.recorder.onstop = this.stoppedRecording.bind(this);
  }

  saveFrame(e: BlobEvent) {
    this.frames.push(e.data);
  }

  stoppedRecording() {
    this.exportStream();
    this.tempVideo();
  }

  exportStream() {
    this.blob = new Blob(this.frames);
  }

  tempVideo() {
    console.log('Temp video');
    const vidURL = URL.createObjectURL(this.blob);
    const vid = document.createElement('video');
    vid.controls = true;
    vid.src = vidURL;
    vid.onended = () => {
      URL.revokeObjectURL(vidURL);
    };
    document.body.append(vid);
  }

  stopRecording() {
    console.log('Stopped recording.');
    this.recorder.stop();
  }
}
