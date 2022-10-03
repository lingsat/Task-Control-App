import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private boardsGeted: boolean = false;
  private boards = new BehaviorSubject<Board[]>([]);

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
    this.http
      .post<Board>('http://localhost:8080/api/board', {
        name,
        description,
      })
      .subscribe((newBoard: Board) => {
        const newBoards = [...this.getBoards(), newBoard];
        this.setBoards(newBoards);
      });
  }

  fetchBoards() {
    if (!this.boardsGeted) {
      this.http
        .get<Board[]>('http://localhost:8080/api/board')
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
          const delIndex = boardTemp.findIndex((board) => board._id === id);
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
          if (board._id === id) {
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
      .put<Board>(`http://localhost:8080/api/board/setcolor/${boardId}`, {
        newColor,
        columnStatus,
      })
      .subscribe((updatedBoard: Board) => {
        let boardsTemp = this.getBoards().map((board) => {
          if (board._id === boardId) {
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
      .put<Board>(`http://localhost:8080/api/board/task/${id}`, {
        name,
        status,
      })
      .subscribe((updatedBoard: Board) => {
        let boardsTemp = this.getBoards().map((board) => {
          if (board._id === id) {
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
        .delete<Board>(`http://localhost:8080/api/board/task/${boardId}`, {
          body: { taskId },
        })
        .subscribe((updatedBoard: Board) => {
          let boardsTemp = this.getBoards().map((board) => {
            if (board._id === boardId) {
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
      .put<Board>(`http://localhost:8080/api/board/task/edit/${boardId}`, {
        name,
        taskId,
      })
      .subscribe((updatedBoard: Board) => {
        let boardsTemp = this.getBoards().map((board) => {
          if (board._id === boardId) {
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
      .put<Board>(`http://localhost:8080/api/board/task/status/${boardId}`, {
        status,
        taskId,
      })
      .subscribe((updatedBoard: Board) => {
        let boardsTemp = this.getBoards().map((board) => {
          if (board._id === boardId) {
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

  // Archive
  archiveTask(boardId: string, taskId: string) {
    if (confirm('Do you want to remove this Task to archive?')) {
      this.http
        .delete<Board>(
          `http://localhost:8080/api/board/task/archive/${boardId}`,
          {
            body: { taskId },
          }
        )
        .subscribe((updatedBoard: Board) => {
          let boardsTemp = this.getBoards().map((board) => {
            if (board._id === boardId) {
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
