import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: '[cursorEnd]'
})
export class CursorEndDirective {

    constructor(private el: ElementRef) { }

    @HostListener('click', ['$event']) onInputClick(event): void {
        setTimeout(() => {
            this.el.nativeElement.selectionStart = this.el.nativeElement.value.length;
            this.el.nativeElement.selectionEnd = this.el.nativeElement.value.length;
        });
    }
}
