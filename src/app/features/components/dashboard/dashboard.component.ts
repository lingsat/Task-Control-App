import { HttpRequest } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Board } from '../../models/board.model';
import { FormsService } from '../../services/forms.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  boards: Board[] = []; 

  constructor(public formsService: FormsService, public userDataService: UserDataService) { }

  ngOnInit(): void {
    this.userDataService.getBoards();
    // this.userDataService.getBoards().subscribe((boardsRes: any) => {
    //   this.boards = boardsRes.boards;
    //   console.log(boardsRes.boards);
    // })
  }

  onOpenAddBoardModal() {
    this.formsService.openAddBoardForm();
  }

  onDeleteBoard(id: string) {
    this.userDataService.deleteBoard(id);
  }

  onEditBoard(board: Board) {
    this.formsService.setEditedBoardId(board.id, board.name, board.description);
    // this.formsService.openAddBoardForm();
    // console.log(board);
  }
 
}
