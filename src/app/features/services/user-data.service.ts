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
    return this.authService.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.http
            .post(
              'http://localhost:8080/api/board',
              {
                name,
                description,
              },
              {
                headers: new HttpHeaders({
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${user?.token}`,
                }),
              }
            )
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
            );
        })
      )
      .subscribe((newBoard: Board) => {
        const newBoards = [...this.getBoards(), newBoard];
        this.setBoards(newBoards);
      });
  }

  fetchBoards() {
    if (!this.boardsGeted) {
      this.authService.user
        .pipe(
          take(1),
          exhaustMap((user) => {
            return this.http
              .get('http://localhost:8080/api/board', {
                headers: new HttpHeaders({
                  Authorization: `Bearer ${user?.token}`,
                }),
              })
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
              );
          })
        )
        .subscribe((boardsArr: Board[]) => {
          this.setBoards(boardsArr);
          this.boardsGeted = true;
        });
    }
  }

  deleteBoard(id: string) {
    if (confirm('Do you really want to delete this Board?')) {
      this.authService.user
        .pipe(
          take(1),
          exhaustMap((user) => {
            return this.http.delete(`http://localhost:8080/api/board/${id}`, {
              headers: new HttpHeaders({
                Authorization: `Bearer ${user?.token}`,
              }),
            });
          })
        )
        .subscribe(() => {
          let boardTemp = this.getBoards();
          const delIndex = boardTemp.findIndex((board) => board.id === id);
          boardTemp.splice(delIndex, 1);
          this.setBoards(boardTemp);
        });
    }
  }

  editBoard(id: string, name: string) {
    this.authService.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.http.put(
            `http://localhost:8080/api/board/${id}`,
            {
              name,
            },
            {
              headers: new HttpHeaders({
                Authorization: `Bearer ${user?.token}`,
              }),
            }
          );
        })
      )
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
    return this.authService.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.http
            .put(
              `http://localhost:8080/api/board/setcolor/${boardId}`,
              {
                newColor,
                columnStatus,
              },
              {
                headers: new HttpHeaders({
                  Authorization: `Bearer ${user?.token}`,
                }),
              }
            )
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
            );
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
    return this.authService.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.http
            .put(
              `http://localhost:8080/api/board/task/${id}`,
              {
                name,
                status,
              },
              {
                headers: new HttpHeaders({
                  Authorization: `Bearer ${user?.token}`,
                }),
              }
            )
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
            );
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
    if (confirm('Do you really want to delete this Task?')) {
      this.authService.user
        .pipe(
          take(1),
          exhaustMap((user) => {
            return this.http
              .delete(`http://localhost:8080/api/board/task/${boardId}`, {
                headers: new HttpHeaders({
                  Authorization: `Bearer ${user?.token}`,
                }),
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
              );
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
    return this.authService.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.http
            .put(
              `http://localhost:8080/api/board/task/edit/${boardId}`,
              {
                name,
                taskId,
              },
              {
                headers: new HttpHeaders({
                  Authorization: `Bearer ${user?.token}`,
                }),
              }
            )
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
            );
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
    return this.authService.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.http.put(
            `http://localhost:8080/api/board/task/status/${boardId}`,
            {
              status,
              taskId,
            },
            {
              headers: new HttpHeaders({
                Authorization: `Bearer ${user?.token}`,
              }),
            }
          );
        })
      )
      .subscribe();
  }

  addTaskComment(boardId: string, taskId: string, comment: string) {
    return this.authService.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.http
            .put(
              `http://localhost:8080/api/board/task/comment/${boardId}`,
              {
                comment,
                taskId,
              },
              {
                headers: new HttpHeaders({
                  Authorization: `Bearer ${user?.token}`,
                }),
              }
            )
        })
      )
      .subscribe();
  }

  deleteTaskComment(boardId: string, taskId: string, commentIndex: number) {
    if (confirm('Do you really want to delete this Comment?')) {
      this.authService.user
        .pipe(
          take(1),
          exhaustMap((user) => {
            return this.http
              .delete(`http://localhost:8080/api/board/task/comment/${boardId}`, {
                headers: new HttpHeaders({
                  Authorization: `Bearer ${user?.token}`,
                }),
                body: { commentIndex, taskId },
              })
          })
        )
        .subscribe();
    }
  }

  archiveTask(boardId: string, taskId: string) {
    if (confirm('Do you really want to remove this task to archive?')) {
      this.authService.user
        .pipe(
          take(1),
          exhaustMap((user) => {
            return this.http
              .delete(`http://localhost:8080/api/board/task/archive/${boardId}`, {
                headers: new HttpHeaders({
                  Authorization: `Bearer ${user?.token}`,
                }),
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
              );
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
      this.authService.user
        .pipe(
          take(1),
          exhaustMap((user) => {
            return this.http
              .put('http://localhost:8080/api/board/archive/clear', {
                userId: user?.userId
              }, {
                headers: new HttpHeaders({
                  Authorization: `Bearer ${user?.token}`,
                }),
              })
          })
        ).subscribe(() => {
          const boardsTemp = this.getBoards().map((board) => {
            return { ...board, archive: [] };
          });
          this.setBoards(boardsTemp);
        });
    }
  }
}
