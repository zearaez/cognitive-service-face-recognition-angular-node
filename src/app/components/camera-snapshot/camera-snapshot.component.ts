import { Component, ViewChild, OnInit, Output, Input, EventEmitter, ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { BlockUIService } from '../../services/block-ui.service';

@Component({
  selector: 'app-camera-snapshot',
  templateUrl: './camera-snapshot.component.html',
  styleUrls: ['./camera-snapshot.component.css']
})
export class CameraSnapshotComponent implements OnInit {

  private mediaStream;
  @Input() imageUrl: string;
  @Output() imageCreated = new EventEmitter();
  @ViewChild('video', {static: true}) video: ElementRef;
  @ViewChild('canvas', {static: true}) private canvas;

  constructor(private ref: ChangeDetectorRef, private blockUI: BlockUIService, private renderer: Renderer2) { }

  ngOnInit() {
    this.startCamera();
  }
  constraints = {
    video: {
        facingMode: "environment",
        width: { ideal: 4096 },
        height: { ideal: 2160 }
    }
  };
  
  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) { 
 navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
        alert('Sorry, camera not available.');
    }
  }
  attachVideo(stream) {
    this.renderer.setProperty(this.video.nativeElement, 'srcObject', stream);
  }
  handleError(error) {
    console.log('Error: ', error);
}

  getCameraImage() {
    // block UI and reset image
    this.blockUI.start();
    this.imageUrl = undefined;
    this.imageCreated.emit(undefined);
    const mediaStream = new MediaStream();
    this.mediaStream = mediaStream;
        setTimeout(() => {
          // create screenshot and emit as dataUrl
          var ctx = this.canvas.nativeElement.getContext('2d');
          ctx.drawImage(this.video.nativeElement, 0, 0, 500, 380);
          this.imageUrl = this.canvas.nativeElement.toDataURL()
          this.imageCreated.emit(this.imageUrl);
          
          //stop video and blockUI
          // this.mediaStream.getVideoTracks()[0].stop();
          this.blockUI.stop();
          this.ref.detectChanges();
        }, 3000);
    // request access to camera for video
    // navigator.getUserMedia(
    //   {video:true},
    //   mediaStream => {
    //     this.mediaStream = mediaStream;
    //     this.video.nativeElement.src = window.URL.createObjectURL(mediaStream);
    //     setTimeout(() => {
    //       // create screenshot and emit as dataUrl
    //       var ctx = this.canvas.nativeElement.getContext('2d');
    //       ctx.drawImage(this.video.nativeElement, 0, 0, 500, 380);
    //       this.imageUrl = this.canvas.nativeElement.toDataURL()
    //       this.imageCreated.emit(this.imageUrl);
          
    //       //stop video and blockUI
    //       this.mediaStream.getVideoTracks()[0].stop();
    //       this.blockUI.stop();
    //       this.ref.detectChanges();
    //     }, 3000);
    //   },
    //   error => {});
  }

}
