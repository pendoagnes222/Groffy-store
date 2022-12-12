import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Product[], filterString: string, propName: string): Product[] {
    const result: Product[] = [];

    if(!value || filterString==="" || propName ==="") {
      return value;
    }

    value.forEach((a: Product)=> {
      if(a[propName].trim().toLowerCase().includes(filterString.toLowerCase())) {
        result.push(a);
      }
    });

    return result;
    
  }

}
