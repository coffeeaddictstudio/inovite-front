import {Pipe} from '@angular/core';

@Pipe({
    name: 'phone'
})
export class PhoneDirective{

    transform(value): string {
        if (!value) {
            return '';
        }

        const ddd = value.substr(0, 2);
        const digit = value.substr(2, 1);
        const first = value.substr(3, 4);
        const last = value.substr(7, 4);

        return '(' + ddd + ') ' + digit + ' ' + first + '-' + last;
    }
}
