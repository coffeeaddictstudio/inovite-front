import {Pipe} from '@angular/core';

@Pipe({
    name: 'time'
})
export class TimeDirective{

    transform(value): string {
        const hour = value.split(':');
        hour.pop();

        return hour.join(':');
    }
}
