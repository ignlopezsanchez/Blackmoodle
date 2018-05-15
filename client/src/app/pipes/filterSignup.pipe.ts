import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSignup',
})
export class FilterSignupPipe implements PipeTransform {

  transform(value: Array<any>, degree: any, course:any): any {
     value = value.filter(e => { 
      return (e.degree.name === degree) && (e.course === Number(course));
    });

    return value;
  }
}
