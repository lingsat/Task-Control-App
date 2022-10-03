import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take, map, BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Board, BoardResponse } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private boardsGeted: boolean = false;
  private boards = new BehaviorSubject<Board[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) {}

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
    this.http
      .post('http://localhost:8080/api/board', {
        name,
        description,
      })
      .pipe(
        map((newBoard: any) => {
          return {
            userId: newBoard.userId,
            id: newBoard._id,
            name: newBoard.name,
            description: newBoard.description,
            createdDate: newBoard.createdDate,
            tasks: newBoard.tasks,
            todoCount: newBoard.todoCount,
            progressCount: newBoard.progressCount,
            doneCount: newBoard.doneCount,
            archive: newBoard.archive,
            colColors: newBoard.colColors,
          };
        })
      )
      .subscribe((newBoard: Board) => {
        const newBoards = [...this.getBoards(), newBoard];
        this.setBoards(newBoards);
      });
  }

  fetchBoards() {
    if (!this.boardsGeted) {
      this.http
        .get('http://localhost:8080/api/board')
        .pipe(
          map((boards: any) => {
            return boards.boards.map((board: BoardResponse) => {
              return {
                userId: board.userId,
                id: board._id,
                name: board.name,
                description: board.description,
                createdDate: board.createdDate,
                tasks: board.tasks,
                todoCount: board.todoCount,
                progressCount: board.progressCount,
                doneCount: board.doneCount,
                archive: board.archive,
                colColors: board.colColors,
              };
            });
          })
        )
        .subscribe((boardsArr: Board[]) => {
          this.setBoards(boardsArr);
          this.boardsGeted = true;
        });
    }
  }

  deleteBoard(id: string) {
    if (confirm('Do you want to delete this Board?')) {
      this.http
        .delete(`http://localhost:8080/api/board/${id}`)
        .subscribe(() => {
          let boardTemp = this.getBoards();
          const delIndex = boardTemp.findIndex((board) => board.id === id);
          boardTemp.splice(delIndex, 1);
          this.setBoards(boardTemp);
        });
    }
  }

  editBoard(id: string, name: string) {
    this.http
      .put(`http://localhost:8080/api/board/${id}`, { name })
      .subscribe(() => {
        let boardTemp = this.getBoards().map((board) => {
          if (board.id === id) {
            return { ...board, name };
          } else {
            return board;
          }
        });
        this.setBoards(boardTemp);
      });
  }

  setBoardColor(boardId: string, columnStatus: string, newColor: string) {
    this.http
      .put(`http://localhost:8080/api/board/setcolor/${boardId}`, {
        newColor,
        columnStatus,
      })
      .pipe(
        map((updatedBoard: any) => {
          return {
            userId: updatedBoard.userId,
            id: updatedBoard._id,
            name: updatedBoard.name,
            description: updatedBoard.description,
            createdDate: updatedBoard.createdDate,
            tasks: updatedBoard.tasks,
            todoCount: updatedBoard.todoCount,
            progressCount: updatedBoard.progressCount,
            doneCount: updatedBoard.doneCount,
            archive: updatedBoard.archive,
            colColors: updatedBoard.colColors,
          };
        })
      )
      .subscribe((updatedBoard: Board) => {
        let boardsTemp = this.getBoards().map((board) => {
          if (board.id === boardId) {
            return updatedBoard;
          } else {
            return board;
          }
        });
        this.setBoards(boardsTemp);
      });
  }

  // Tasks
  addTask(id: string, name: string, status: string) {
    this.http
      .put(`http://localhost:8080/api/board/task/${id}`, {
        name,
        status,
      })
      .pipe(
        map((updatedBoard: any) => {
          return {
            userId: updatedBoard.userId,
            id: updatedBoard._id,
            name: updatedBoard.name,
            description: updatedBoard.description,
            createdDate: updatedBoard.createdDate,
            tasks: updatedBoard.tasks,
            todoCount: updatedBoard.todoCount,
            progressCount: updatedBoard.progressCount,
            doneCount: updatedBoard.doneCount,
            archive: updatedBoard.archive,
            colColors: updatedBoard.colColors,
          };
        })
      )
      .subscribe((updatedBoard: Board) => {
        let boardsTemp = this.getBoards().map((board) => {
          if (board.id === id) {
            return updatedBoard;
          } else {
            return board;
          }
        });
        this.setBoards(boardsTemp);
      });
  }

  deleteTask(boardId: string, taskId: string) {
    if (confirm('Do you want to delete this Task?')) {
      this.http
        .delete(`http://localhost:8080/api/board/task/${boardId}`, {
          body: { taskId },
        })
        .pipe(
          map((updatedBoard: any) => {
            return {
              userId: updatedBoard.userId,
              id: updatedBoard._id,
              name: updatedBoard.name,
              description: updatedBoard.description,
              createdDate: updatedBoard.createdDate,
              tasks: updatedBoard.tasks,
              todoCount: updatedBoard.todoCount,
              progressCount: updatedBoard.progressCount,
              doneCount: updatedBoard.doneCount,
              archive: updatedBoard.archive,
              colColors: updatedBoard.colColors,
            };
          })
        )
        .subscribe((updatedBoard: Board) => {
          let boardsTemp = this.getBoards().map((board) => {
            if (board.id === boardId) {
              return updatedBoard;
            } else {
              return board;
            }
          });
          this.setBoards(boardsTemp);
        });
    }
  }

  editTask(boardId: string, taskId: string, name: string) {
    this.http
      .put(`http://localhost:8080/api/board/task/edit/${boardId}`, {
        name,
        taskId,
      })
      .pipe(
        map((updatedBoard: any) => {
          return {
            userId: updatedBoard.userId,
            id: updatedBoard._id,
            name: updatedBoard.name,
            description: updatedBoard.description,
            createdDate: updatedBoard.createdDate,
            tasks: updatedBoard.tasks,
            todoCount: updatedBoard.todoCount,
            progressCount: updatedBoard.progressCount,
            doneCount: updatedBoard.doneCount,
            archive: updatedBoard.archive,
            colColors: updatedBoard.colColors,
          };
        })
      )
      .subscribe((updatedBoard: Board) => {
        let boardsTemp = this.getBoards().map((board) => {
          if (board.id === boardId) {
            return updatedBoard;
          } else {
            return board;
          }
        });
        this.setBoards(boardsTemp);
      });
  }

  changeTaskStatus(boardId: string, taskId: string, status: string) {
    this.http
      .put(`http://localhost:8080/api/board/task/status/${boardId}`, {
        status,
        taskId,
      })
      .pipe(
        map((updatedBoard: any) => {
          return {
            userId: updatedBoard.userId,
            id: updatedBoard._id,
            name: updatedBoard.name,
            description: updatedBoard.description,
            createdDate: updatedBoard.createdDate,
            tasks: updatedBoard.tasks,
            todoCount: updatedBoard.todoCount,
            progressCount: updatedBoard.progressCount,
            doneCount: updatedBoard.doneCount,
            archive: updatedBoard.archive,
            colColors: updatedBoard.colColors,
          };
        })
      )
      .subscribe((updatedBoard: Board) => {
        let boardsTemp = this.getBoards().map((board) => {
          if (board.id === boardId) {
            return updatedBoard;
          } else {
            return board;
          }
        });
        this.setBoards(boardsTemp);
      });
  }

  addTaskComment(boardId: string, taskId: string, comment: string) {
    this.http
      .put(`http://localhost:8080/api/board/task/comment/${boardId}`, {
        comment,
        taskId,
      })
      .subscribe();
  }

  deleteTaskComment(boardId: string, taskId: string, commentIndex: number) {
    if (confirm('Do you want to delete this Comment?')) {
      this.http
        .delete(`http://localhost:8080/api/board/task/comment/${boardId}`, {
          body: { commentIndex, taskId },
        })
        .subscribe();
    }
  }

  archiveTask(boardId: string, taskId: string) {
    if (confirm('Do you want to remove this Task to archive?')) {
      this.http
        .delete(`http://localhost:8080/api/board/task/archive/${boardId}`, {
          body: { taskId },
        })
        .pipe(
          map((updatedBoard: any) => {
            return {
              userId: updatedBoard.userId,
              id: updatedBoard._id,
              name: updatedBoard.name,
              description: updatedBoard.description,
              createdDate: updatedBoard.createdDate,
              tasks: updatedBoard.tasks,
              todoCount: updatedBoard.todoCount,
              progressCount: updatedBoard.progressCount,
              doneCount: updatedBoard.doneCount,
              archive: updatedBoard.archive,
              colColors: updatedBoard.colColors,
            };
          })
        )
        .subscribe((updatedBoard: Board) => {
          let boardsTemp = this.getBoards().map((board) => {
            if (board.id === boardId) {
              return updatedBoard;
            } else {
              return board;
            }
          });
          this.setBoards(boardsTemp);
        });
    }
  }

  clearArchive() {
    if (confirm('Do you want to Clear Archive?')) {
      this.http
        .put('http://localhost:8080/api/board/archive/clear', {})
        .subscribe(() => {
          const boardsTemp = this.getBoards().map((board) => {
            return { ...board, archive: [] };
          });
          this.setBoards(boardsTemp);
        });
    }
  }
}
