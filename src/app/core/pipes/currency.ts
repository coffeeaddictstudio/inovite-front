import {Pipe} from '@angular/core';

@Pipe({
    name: 'currencyBRL'
})
export class CurrencyBRL{

    transform(value,
              currencySign: string = 'R$ ',
              decimalLength: number = 2,
              chunkDelimiter: string = '.',
              decimalDelimiter: string = ',',
              chunkLength: number = 3): string {

        const result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';
        const num = parseFloat(value).toFixed(Math.max(0, decimalLength));

        return currencySign + (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(result, 'g'), '$&' + chunkDelimiter);
    }
}
