import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { NgSlimScrollModule } from "ngx-slimscroll";
import { ClickOutsideDirective } from "./directives/click-outside.directive";
import { DropFileDirective } from "./directives/drop-file.directive";
import { ImagePickerComponent } from './components/avatar-picker/avatar-picker.component';

@NgModule({
  declarations: [
    ClickOutsideDirective,
    DropFileDirective,
    ImagePickerComponent,
  ],
  exports: [
    ImagePickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSlimScrollModule,
  ]
})
export class SharedModule { }
