import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarouselComponent} from './carousel.component';
import {SharedModule} from '../../../shared/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [
        CarouselComponent
    ],
    imports: [
        SharedModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        CarouselComponent
    ]
})
export class CarouselModule {
}
