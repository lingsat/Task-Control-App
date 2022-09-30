import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/board.model';

export type StatusValues = 'todo' | 'progress' | 'done';

@Pipe({
  name: 'tasksfilter'
})
export class TasksfilterPipe implements PipeTransform {

  transform(tasks: Task[], status: StatusValues): number {    
    return tasks.filter(task => task.status === status).length;
  }

}
