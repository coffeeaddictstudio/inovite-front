import { NativeDateAdapter } from '@angular/material/core';

export class AppDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string {
        console.log(date);

        if (displayFormat === 'input') {


            return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
        } else {
            return date.toDateString();
        }
    }
}
