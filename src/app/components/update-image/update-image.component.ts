import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRestService } from '../../services/user-rest.service';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit {

  private imageUrl;
  private uploadMethod = 'camera';

  constructor(private snackBar: MatSnackBar, private userRestService: UserRestService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  // update user image
  updateImage() {
    this.userRestService.updateImage({
      image: this.imageUrl,
    })
      .subscribe( response => {
        delete this.imageUrl;
        this.snackBar.open('Image updated', 'Success', {duration: 5000});
        this.ref.detectChanges();
      });
  }

  // image changed handler for embedded components (image picker, camera snapshot)
  imageChanged(data) {
    this.imageUrl = data;
    this.ref.detectChanges();
  }

}
