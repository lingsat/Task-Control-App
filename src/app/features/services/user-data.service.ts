import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take, map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Board, BoardResponse } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  boards: Board[] = [];

  constructor(private authService: AuthService, private http: HttpClient) {}

  addBoard(name: string, description: string) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.post(
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
        ).pipe(map((newBoard: any) => {
          return {
            userId: newBoard.userId,
            id: newBoard._id,
            name: newBoard.name,
            description: newBoard.description,
            createdDate: newBoard.createdDate,
            tasks: newBoard.tasks,
          }
        }));
      })
    ).subscribe((newBoard: Board) => {
      this.boards = [ ...this.boards, newBoard ];
    });
  }

  getBoards() {
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
                  };
                });
              })
            );
        })
      )
      .subscribe((boardsArr: Board[]) => {
        this.boards = boardsArr;
        // console.log(boardsArr);
      });
  }

  deleteBoard(id: string) {
    if (confirm('Do you really want to delete this Board?')) {
      this.authService.user.pipe(
        take(1),
        exhaustMap((user) => {
          return this.http.delete(`http://localhost:8080/api/board/${id}`, {
            headers: new HttpHeaders({
              Authorization: `Bearer ${user?.token}`,
            }),
          })
        })
      ).subscribe(() => {
        const delIndex = this.boards.findIndex((board) => board.id === id);
        this.boards.splice(delIndex, 1);
      })
    }
  }

  editBoard(id: string, name: string) {
    this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.put(`http://localhost:8080/api/board/${id}`,{
          name
        }, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${user?.token}`,
          }),
        })
      })
    ).subscribe(() => {
      this.boards = this.boards.map(board => {
        if (board.id === id) {
          return { ... board, name }
        } else {
          return board;
        }
      })
    })
  }

  test(id:string) {
    console.log(this.boards.findIndex((board) => board.id === id));
  }
}
