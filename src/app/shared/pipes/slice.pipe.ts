import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice'
})
export class SlicePipe implements PipeTransform {

  transform(value: string, splite: string, startSlice: number, endSlice: number, join: string): unknown {
    return value.split(splite).slice(startSlice, endSlice).join(join);
  }

}
