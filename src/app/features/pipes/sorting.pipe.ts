import { Pipe, PipeTransform } from '@angular/core';
import { Board } from '../models/board.model';

export type SortOrder = 'asc' | 'desc';
export type SortRules = 'name' | 'createdDate';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(boards: any, sortBy: SortRules, sortOrder: SortOrder) {
    if (!boards || (sortOrder !== 'asc' && sortOrder !== 'desc')) return boards;

    let sortedBoards = boards.sort((a: Board, b: Board) => {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      } else if (a[sortBy] > b[sortBy]) {
        return 1
      } else {
        return 0;
      }
    });

    return sortOrder === 'asc' ? sortedBoards : sortedBoards.reverse();
  }
}
