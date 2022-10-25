import { FilteringPipe } from './filtering.pipe';
import { Board } from '../models/board.model';
import { testBoards } from 'src/app/mockData/mockData';

describe('FilteringPipe', () => {
  let pipe: FilteringPipe;

  beforeEach(() => {
    pipe = new FilteringPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('filtering array by name', () => {
    const termName: string | undefined = 'second';
    const filteredArr: Board[] = pipe.transform(testBoards, termName);
    expect(filteredArr[0].name).toBe('Second board');
    expect(filteredArr.length).toBe(1);
  });

  it('filtering array with undefined termName', () => {
    const termName: string | undefined = undefined;
    const filteredArr: Board[] = pipe.transform(testBoards, termName);
    expect(filteredArr[0].name).toBe('First board');
    expect(filteredArr.length).toBe(testBoards.length);
  });
});
