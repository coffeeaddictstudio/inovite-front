import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CondominiumService} from "../condominium.service";

@Component({
    selector: 'app-form-enterprise',
    templateUrl: './form-enterprise.component.html',
    styleUrls: ['./form-enterprise.component.scss']
})
export class FormEnterpriseComponent implements OnInit {

    enterpriseForm: FormGroup;
    constructor(
        private _formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private _condominiumService: CondominiumService
    ) {
    }

    ngOnInit(): void {
        this.enterpriseForm = this._formBuilder.group({
            name: [null, [Validators.required]],
            cnpj: [null],
            address: [null],
            number: [null],
            district: [null],
            city: [null],
            state: [null],
            country: [null],
            email: [null],
            phone: [null],
        });
    }

    save() {
        // Mark all as touched
        this.enterpriseForm.markAllAsTouched();

        // Validate form
        if (!this.enterpriseForm.valid) {
            return;
        }

        const body = {
            ...this.enterpriseForm.value,
        };

        this._condominiumService.createEnterprise(body)
            .subscribe(() => {
                // Mark for check
                this._changeDetectorRef.markForCheck();
            }, () => {

            }, () => {
            });
    }
}
