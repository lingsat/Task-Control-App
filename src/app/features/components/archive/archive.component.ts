import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Board, Task } from '../../models/board.model';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit, OnDestroy {
  boards: Board[] = [];
  archiveTasks: Task[] = [];
  showDelBtn: boolean = true;
  boardsSub!: Subscription;

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.userDataService.fetchBoards();
    this.boardsSub = this.userDataService
      .getBoardsObs()
      .subscribe((boards: Board[]) => {
        this.boards = boards;
        if (boards.every((board) => board.archive.length === 0)) {
          this.showDelBtn = false;
        } else {
          this.showDelBtn = true;
        }
      });
  }

  onClearArchive(): void {
    this.userDataService.clearArchive();
  }

  ngOnDestroy(): void {
    this.boardsSub.unsubscribe();
  }
}
