import { SortingPipe } from './sorting.pipe';
import { Task } from '../models/board.model';
import { testTasks } from 'src/app/mockData/mockData';

describe('SortingPipe', () => {
  let pipe: SortingPipe;

  beforeEach(() => {
    pipe = new SortingPipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('sort by name ascending', () => {
    const sortedByNameArr: Task[] = pipe.transform(testTasks, 'name', 'asc');
    expect(sortedByNameArr[0].name).toBe('First task');
    expect(sortedByNameArr[1].name).toBe('Fourth task');
    expect(sortedByNameArr[2].name).toBe('Fourth task');
    expect(sortedByNameArr[3].name).toBe('Second task');
    expect(sortedByNameArr[4].id).toBe('3');
  });

  it('sort by name descending', () => {
    const sortedByNameArr: Task[] = pipe.transform(testTasks, 'name', 'desc');
    expect(sortedByNameArr[0].name).toBe('Third task');
    expect(sortedByNameArr[1].name).toBe('Second task');
    expect(sortedByNameArr[2].name).toBe('Fourth task');
    expect(sortedByNameArr[3].name).toBe('Fourth task');
    expect(sortedByNameArr[4].name).toBe('First task');
  });
});
