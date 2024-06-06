import {Directive, OnInit, ElementRef, HostListener, Input} from '@angular/core';
import {AbstractControl, Validators} from '@angular/forms';
import {MaskPipe} from 'ngx-mask';
import {distinctUntilChanged} from 'rxjs/operators';

@Directive({
    selector: '[documentMaskProvider]',
    providers: [MaskPipe]
})
export class DocumentMaskProviderDirective implements OnInit
{
    @Input('documentMaskProvider') control: AbstractControl;

    private inputElement: HTMLInputElement;

    constructor(
        private el: ElementRef,
        private nxgMask: MaskPipe
    ) {
    }

    ngOnInit(): void
    {
        this.inputElement = this.el.nativeElement;

        if (this.control && this.control.value) {
            this._mask(this.control.value, true);
        }

        this.control.valueChanges
            .pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
            .subscribe((change) => {
                this._mask(change);
            });
    }

    @HostListener('input')
    onInput(): void
    {
        this._mask(this.inputElement.value);
    }

    private _mask(value, load: boolean = false): void
    {
        console.log(value);

        if (this.control) {
            this.control.clearValidators();
        }

        if (value.length > 18) {
            this.inputElement.value = this.inputElement.value.substring(0, this.inputElement.value.length - 1);
            this.control.setValue(this.inputElement.value);
            return;
        }

        this.inputElement.value = this.nxgMask.transform(value, '00.000.000/0000-00');

        if (this.control) {
            this.control.setValidators([Validators.minLength(18)]);
            this.control.updateValueAndValidity();
        }

        if (this.control) {
            this.control.setValue(this.inputElement.value);
        }
    }
}
