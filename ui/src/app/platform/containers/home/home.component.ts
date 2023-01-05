import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { UserModel } from '../../../core/models/user.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CLIENT_CONFIG } from '../../../core/config/client-global-config-injection-token';
import { ClientConfig } from '../../../core/config/client-config.interface';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public currentUser: UserModel | null = null;

  constructor(
    private userService: UserService,
    @Inject(CLIENT_CONFIG)
    private config: ClientConfig,
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.currentUser = res;
      })
  }

  public onUpload(upload: any): void {
    console.log(this.currentUser);

    const formData = new FormData();
    formData.append('upload', upload);

    this.userService.uploadFile(String(this.currentUser?.id), formData).subscribe()

  }

  public downloadURI(media: any) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${this.config.apiBase}/${media.path}`, true);
    xhr.responseType = "blob";
    xhr.onload = function(){
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(this.response);
      const tag = document.createElement('a');
      tag.href = imageUrl;
      tag.download = media.original_name;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    }
    xhr.send();
  }

}
