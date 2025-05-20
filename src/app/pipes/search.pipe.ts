import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data:any[],_searchName:string): any[] {
    return data.filter((item)=>item.name.toLowerCase().includes(_searchName.toLowerCase()));
  }

}
