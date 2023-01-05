import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding, HostListener,
  Input,
  OnChanges,
  Output, SimpleChanges
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-image-picker',
  template: `
    <div
      *ngIf="!value; else mediaPreview"
      appDropFile
      (fileDropped)="setPhotoGallery($event)"
      class="flex items-center justify-center flex-col h-full w-full rounded-md border border-black border-dashed p-6">
      <label
        for="file-upload"
        class="cursor-pointer border text-primary-normal border-primary-normal text-sm py-2 px-4 rounded-lg">
        <span>Upload Image</span>
      </label>
      <p class="mt-3 text-sm opacity-50">Recommended format: 1280 x 720 or 1920 x 1080 pixels(PNG or JPG)</p>
      <input
        (change)="handleFileInput($event)"
        id="file-upload"
        name="file-upload"
        type="file"
        class="sr-only"
      />
    </div>

    <ng-template #mediaPreview>
      <div class="relative w-full h-full">
        <img class="rounded-md h-full object-center object-cover w-full"
             [src]="value"
            alt="Company Avatar"
        />

        <button class="cursor-pointer border rounded-full bg-white absolute top-4 right-4 p-1 z-10 hover:scale-125" (click)="setValue('')">
          <svg class="w-2 h-2" width="14" height="14" viewBox="0 0 14 14" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.00072 8.41401L11.9507 13.364L13.3647 11.95L8.41472 7.00001L13.3647 2.05001L11.9507 0.636013L7.00072 5.58601L2.05072 0.636013L0.636719 2.05001L5.58672 7.00001L0.636719 11.95L2.05072 13.364L7.00072 8.41401Z"
              fill="#1D1C1F"/>
          </svg>
        </button>
      </div>
    </ng-template>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ImagePickerComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagePickerComponent implements OnChanges {

  @Input()
  public value: string = '';

  @Input()
  public disabled = false;

  @Output()
  public fileUploaded = new EventEmitter<string>();

  @Input()
  @HostBinding('attr.tabIndex')
  tabIndex = 0;

  @HostListener('blur')
  onBlur() {
    this.onTouch();
  }

  onChange: (newValue: string) => void = () => {};
  onTouch: () => void = () => {};

  constructor(private cd: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.onChange(changes['value'].currentValue);
    }
  }

  writeValue(obj: string): void {
    this.value = obj;
    this.cd.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cd.markForCheck();
  }

  setValue(value: string) {
    if (!this.disabled) {
      this.value = value;
      this.cd.markForCheck();

      this.onChange(this.value);
      this.onTouch();
      this.fileUploaded.emit(this.value);
    }
  }

  public handleFileInput(event: Event): void {
    const { target } = event;
    const files = (target as HTMLInputElement).files;

    this.setPhotoGallery(files);
  }

  public setPhotoGallery(files: FileList | null): void {
    if (files && files.length) {
      this.setValue(files[0] as any);
    }
  }

}
