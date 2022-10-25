import { TasksfilterPipe } from './tasksfilter.pipe';
import { testTasks } from 'src/app/mockData/mockData';
import { Task } from '../models/board.model';

describe('TasksfilterPipe', () => {
  let pipe: TasksfilterPipe;
  let tasksArr: Task[];

  beforeEach(() => {
    pipe = new TasksfilterPipe();
    tasksArr = [ ...testTasks ];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  
  it('todo task count', () => {
    let todoTasksCount: number = pipe.transform(tasksArr, 'todo');
    expect(todoTasksCount).toBe(1);
  });
  
  it('progress task count', () => {
    let progressTasksCount: number = pipe.transform(tasksArr, 'progress');
    expect(progressTasksCount).toBe(2);
  });

  it('done task count', () => {
    let doneTasksCount: number = pipe.transform(tasksArr, 'done');
    expect(doneTasksCount).toBe(2);
  });
});
