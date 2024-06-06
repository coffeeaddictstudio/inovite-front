import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'converteDataMesPipe'
})

export class ConvertDateMonth implements PipeTransform {

    transform(value: string) {

        if (!value) {
            return '';
        }

        var pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
        var arrayDate = value.match(pattern);
        var dt = new Date(+arrayDate[3], +arrayDate[2] - 1, +arrayDate[1]);
        return this.getMesPorExtenso(dt);

    }

    getMesPorExtenso(data = new Date()): string {
        let mesPorExtenso = [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro"
        ]
        return mesPorExtenso[data.getMonth()];
    }
}
