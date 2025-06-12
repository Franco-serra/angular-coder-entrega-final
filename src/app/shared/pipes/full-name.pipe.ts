import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName',
  standalone: false
})
export class FullNamePipe implements PipeTransform {

  transform(value: { firstName: string, lastName: string }): string {
    if (!value) {
      return '';  
    }
    
    return `${value.firstName} ${value.lastName}`;
  }
}
