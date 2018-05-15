import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSignup'
})
export class FilterSignupPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
