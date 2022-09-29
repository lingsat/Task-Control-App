import {
  AfterContentInit,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormsService } from 'src/app/features/services/forms.service';
import { Board, Task } from 'src/app/features/models/board.model';
import { UserDataService } from 'src/app/features/services/user-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { SortOrder, SortRules } from 'src/app/features/pipes/sorting.pipe';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  todoTasks: Task[] = [];
  progressTasks: Task[] = [];
  doneTasks: Task[] = [];
  curentBoardId: string = '';
  boardName: string = '';
  subscription!: Subscription;

  currentDraggableTask!: Task;

  searchText!: string;
  sortValue: SortRules = 'createdDate';
  sortOrder: SortOrder = 'asc';

  constructor(
    public formsService: FormsService,
    private userDataService: UserDataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userDataService.fetchBoards();
    this.activatedRoute.params.subscribe((data) => {
      this.curentBoardId = data['id'];
    });

    this.subscription = this.userDataService
      .getBoardsObs()
      .subscribe((boards) => {
        this.cleartasks();
        let curentBoard = boards.find(
          (board) => board.id === this.curentBoardId
        );
        if (curentBoard) {
          this.boardName = curentBoard.name;
          let tasks = curentBoard.tasks;
          tasks.forEach((task) => {
            switch (task.status) {
              case 'todo':
                this.todoTasks.push(task);
                break;
              case 'progress':
                this.progressTasks.push(task);
                break;
              case 'done':
                this.doneTasks.push(task);
                break;
            }
          });
        }
      });
  }

  cleartasks() {
    this.todoTasks = [];
    this.progressTasks = [];
    this.doneTasks = [];
  }

  onOpenAddTaskForm() {
    this.formsService.openAddTaskForm();
  }

  // Drag and Drop
  onDragStart(task: Task) {
    this.currentDraggableTask = task;
  }

  onDrop(status: string) {
    let dragStatus = this.currentDraggableTask.status;
    let dragId = this.currentDraggableTask.id;
    let modedTask: any = { ...this.currentDraggableTask, status };
    // move task to other column
    if (status !== dragStatus) {
      this[`${dragStatus}Tasks`] = this[`${dragStatus}Tasks`].filter(
        (task) => task.id !== dragId
      );
      switch (status) {
        case 'todo':
          this.todoTasks.push(modedTask);
          break;
        case 'progress':
          this.progressTasks.push(modedTask);
          break;
        case 'done':
          this.doneTasks.push(modedTask);
          break;
      }
      this.userDataService.changeTaskStatus(this.curentBoardId, this.currentDraggableTask.id, status);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
