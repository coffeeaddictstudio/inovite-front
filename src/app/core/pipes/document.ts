import {Pipe} from '@angular/core';

@Pipe({
    name: 'document'
})
export class DocumentDirective{

    transform(value): string {
        if (value.length === 11) {
            return value.substr(0, 3) + '.' +
            value.substr(3, 3) + '.' +
            value.substr(6, 3) + '-' +
            value.substr(9, 2);
        } else if (value.length === 14) {
            return value.substr(0, 2) + '.' +
                value.substr(2, 3) + '.' +
                value.substr(5, 3) + '/' +
                value.substr(8, 4) + '-' +
                value.substr(12, 2) ;
        } else {
            return value;
        }
    }
}
