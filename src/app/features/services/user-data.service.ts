import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Board, Task, taskStatus } from '../models/board.model';
import { environment as env } from 'src/environments/environment';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private boardsGeted: boolean = false;
  private boards = new BehaviorSubject<Board[]>([]);

  boardLoading: boolean = false;

  constructor(private http: HttpClient) {}

  // Boards
  getBoardsObs(): Observable<Board[]> {
    return this.boards;
  }

  getBoards() {
    return this.boards.getValue();
  }

  setBoards(boards: Board[]) {
    this.boards.next(boards);
  }

  clearBoardsRequestState() {
    this.boardsGeted = false;
  }

  addBoard(name: string, description: string) {
    this.boardLoading = true;
    this.http
      .post<Board>(`${env.SERVER_URL}/api/board`, {
        name,
        description,
      })
      .subscribe((newBoard: Board) => {
        const newBoards = [...this.getBoards(), newBoard];
        this.setBoards(newBoards);
        this.boardLoading = false;
      });
  }

  fetchBoards() {
    if (!this.boardsGeted) {
      this.boardLoading = true;
      this.http
        .get<Board[]>(`${env.SERVER_URL}/api/board`)
        .subscribe((boardsArr: Board[]) => {
          this.setBoards(boardsArr);
          this.boardsGeted = true;
          this.boardLoading = false;
        });
    }
  }

  deleteBoard(id: string) {
    if (confirm('Do you want to delete this Board?')) {
      let filteredBoards = this.getBoards().filter((board) => board._id !== id);
      this.setBoards(filteredBoards);
      this.http.delete(`${env.SERVER_URL}/api/board/${id}`).subscribe();
    }
  }

  editBoard(id: string, name: string) {
    let boardsTemp = this.getBoards().map((board) => {
      return board._id === id ? { ...board, name } : board;
    });
    this.setBoards(boardsTemp);

    this.http.put(`${env.SERVER_URL}/api/board/${id}`, { name }).subscribe();
  }

  setBoardColor(boardId: string, columnStatus: string, newColor: string) {
    let boardsTemp = this.getBoards().map((board) => {
      if (board._id === boardId) {
        switch (columnStatus) {
          case 'todo':
            board.colColors.todo = newColor;
            break;
          case 'progress':
            board.colColors.progress = newColor;
            break;
          case 'done':
            board.colColors.done = newColor;
            break;
        }
        return board;
      } else {
        return board;
      }
    });
    this.setBoards(boardsTemp);

    this.http
      .put<Board>(`${env.SERVER_URL}/api/board/setcolor/${boardId}`, {
        newColor,
        columnStatus,
      })
      .subscribe();
  }

  // Tasks
  addTask(id: string, name: string, status: taskStatus) {
    const taskId = uuid.v4();
    let createdDate = new Date();
    const newTask: Task = {
      id: taskId,
      boardId: id,
      name,
      status,
      createdDate,
      comments: [],
      commentsCounter: 0,
    };
    let boardsTemp = this.getBoards().map((board) => {
      if (board._id === id) {
        board.tasks.push(newTask);
        board.todoCount = board.tasks.filter(
          (task) => task.status === 'todo'
        ).length;
        board.progressCount = board.tasks.filter(
          (task) => task.status === 'progress'
        ).length;
        board.doneCount = board.tasks.filter(
          (task) => task.status === 'done'
        ).length;
        return board;
      } else {
        return board;
      }
    });
    this.setBoards(boardsTemp);

    this.http
      .put<Board>(`${env.SERVER_URL}/api/board/task/${id}`, {
        name,
        status,
        taskId,
        createdDate,
      })
      .subscribe();
  }

  deleteTask(boardId: string, taskId: string) {
    if (confirm('Do you want to delete this Task?')) {
      let boardsTemp = this.getBoards().map((board) => {
        if (board._id === boardId) {
          board.tasks = board.tasks.filter((task) => task.id !== taskId);
          board.todoCount = board.tasks.filter(
            (task) => task.status === 'todo'
          ).length;
          board.progressCount = board.tasks.filter(
            (task) => task.status === 'progress'
          ).length;
          board.doneCount = board.tasks.filter(
            (task) => task.status === 'done'
          ).length;
          return board;
        } else {
          return board;
        }
      });
      this.setBoards(boardsTemp);

      this.http
        .delete<Board>(`${env.SERVER_URL}/api/board/task/${boardId}`, {
          body: { taskId },
        })
        .subscribe();
    }
  }

  editTask(boardId: string, taskId: string, name: string, status: taskStatus) {
    let boardsTemp = this.getBoards().map((board) => {
      if (board._id === boardId) {
        board.tasks = board.tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, name, status };
          } else {
            return task;
          }
        });
        board.todoCount = board.tasks.filter(
          (task) => task.status === 'todo'
          ).length;
        board.progressCount = board.tasks.filter(
          (task) => task.status === 'progress'
        ).length;
        board.doneCount = board.tasks.filter(
          (task) => task.status === 'done'
          ).length;
        return board;
      } else {
        return board;
      }
    });
    this.setBoards(boardsTemp);

    this.http
      .put<Board>(`${env.SERVER_URL}/api/board/task/edit/${boardId}`, {
        name,
        status,
        taskId,
      })
      .subscribe();
  }

  changeTaskStatus(boardId: string, taskId: string, status: taskStatus) {
    let boardsTemp = this.getBoards().map((board) => {
      if (board._id === boardId) {
        let modedTasks: Task[] = [];
        let changedTask!: Task;
        board.tasks.forEach((task) => {
          if (task.id === taskId) {
            changedTask = { ... task, status };
          } else {
            modedTasks.push(task);
          }
        });
        board.tasks = [ ...modedTasks, changedTask ];
        board.todoCount = board.tasks.filter(
          (task) => task.status === 'todo'
          ).length;
        board.progressCount = board.tasks.filter(
          (task) => task.status === 'progress'
        ).length;
        board.doneCount = board.tasks.filter(
          (task) => task.status === 'done'
          ).length;
        return board;
      } else {
        return board;
      }
    });
    this.setBoards(boardsTemp);

    this.http
      .put<Board>(`${env.SERVER_URL}/api/board/task/status/${boardId}`, {
        status,
        taskId,
      })
      .subscribe();
  }

  addTaskComment(boardId: string, taskId: string, comment: string) {
    this.http
      .put(`${env.SERVER_URL}/api/board/task/comment/${boardId}`, {
        comment,
        taskId,
      })
      .subscribe();
  }

  deleteTaskComment(boardId: string, taskId: string, commentIndex: number) {
    if (confirm('Do you want to delete this Comment?')) {
      this.http
        .delete(`${env.SERVER_URL}/api/board/task/comment/${boardId}`, {
          body: { commentIndex, taskId },
        })
        .subscribe();
    }
  }

  // Archive
  archiveTask(boardId: string, taskId: string) {
    if (confirm('Do you want to remove this Task to archive?')) {
      let boardsTemp = this.getBoards().map((board) => {
        if (board._id === boardId) {
          board.tasks = board.tasks.filter((task: Task) => {
            if (task.id === taskId) {
              board.archive.push(task);
              return false;
            } else {
              return true;
            }
          });
          board.todoCount = board.tasks.filter(
            (task) => task.status === 'todo'
          ).length;
          board.progressCount = board.tasks.filter(
            (task) => task.status === 'progress'
          ).length;
          board.doneCount = board.tasks.filter(
            (task) => task.status === 'done'
          ).length;
          return board;
        } else {
          return board;
        }
      });
      this.setBoards(boardsTemp);

      this.http
        .delete<Board>(`${env.SERVER_URL}/api/board/task/archive/${boardId}`, {
          body: { taskId },
        })
        .subscribe();
    }
  }

  clearArchive() {
    if (confirm('Do you want to Clear Archive?')) {
      const boardsTemp = this.getBoards().map((board) => {
        return { ...board, archive: [] };
      });
      this.setBoards(boardsTemp);

      this.http
        .put(`${env.SERVER_URL}/api/board/archive/clear`, {})
        .subscribe();
    }
  }
}
