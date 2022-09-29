import { Pipe, PipeTransform } from '@angular/core';
import { Board, Task } from '../models/board.model';

@Pipe({
  name: 'filtering'
})
export class FilteringPipe implements PipeTransform {

  transform(boards: any, term: string | undefined) {
    if (term === undefined) {
      return boards;
    } else {
      return boards.filter((board: Board | Task) => board.name.toLowerCase().includes(term.toLowerCase()));
    }
  }

}
