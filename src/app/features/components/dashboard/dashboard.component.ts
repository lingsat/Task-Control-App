import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Board } from '../../models/board.model';
import { FormsService } from '../../services/forms.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  boards: Board[] = []; 
  boardsSub!: Subscription;

  constructor(public formsService: FormsService, public userDataService: UserDataService) { }

  ngOnInit(): void {
    this.userDataService.fetchBoards();
    this.boardsSub = this.userDataService.getBoardsObs().subscribe(boards => {
      this.boards = boards;
    })
  }

  onOpenAddBoardModal() {
    this.formsService.openAddBoardForm();
  }

  onDeleteBoard(id: string) {
    this.userDataService.deleteBoard(id);
  }

  onEditBoard(board: Board) {
    this.formsService.setEditedBoardId(board.id, board.name, board.description);
  }

  ngOnDestroy(): void {
    this.boardsSub.unsubscribe();
  } 
}
