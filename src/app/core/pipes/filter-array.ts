import {Pipe} from '@angular/core';

@Pipe({
    name: 'filterArray'
})
export class FilterArray{

    transform(items: any, term: string): any {
        const filter = items.filter((item) => {
            return this.checkInside(item, term);
        });

        return filter;
    }

    checkInside(item: any, term: string): any {
        const toCompare = term.toLowerCase();

        if (typeof item === 'string' && item.toString().toLowerCase().includes(toCompare)) {
            return true;
        }

        for (const property in item) {
            if (item[property] === null || item[property] === undefined) {
                continue;
            }
            if (typeof item[property] === 'object') {
                if (this.checkInside(item[property], term)) {
                    return true;
                }
            }
            else if (item[property].toString().toLowerCase().includes(toCompare)) {
                return true;
            }
        }
        return false;
    }
}
