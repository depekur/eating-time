import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordEndings'
})
export class PortionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const titles = args;
    const cases = [2, 0, 1, 1, 1, 2];
    const number = +value;

    return `${number} ${titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ]}`;
  }
}
