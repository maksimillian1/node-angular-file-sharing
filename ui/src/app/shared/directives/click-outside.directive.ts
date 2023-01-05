import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {

  @Input() public clickOutsideActive: boolean = false;
  @Output('clickOutside') onClickOutside = new EventEmitter<MouseEvent>();

  constructor(private ref: ElementRef) {}

  @HostListener('document:click', ['$event', '$event.target'])
  onDocumentClicked(event: MouseEvent, targetElement: HTMLElement) {
    if(!this.clickOutsideActive) return;

    if (targetElement && document.body.contains(targetElement) && !this.ref.nativeElement.contains(targetElement)) {
      this.onClickOutside.emit(event);
    }
  }
}

