import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsService } from 'src/app/features/services/forms.service';
import { Task } from 'src/app/features/models/board.model';
import { UserDataService } from 'src/app/features/services/user-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
  sortValue: SortRules = 'none';
  sortOrder: SortOrder = 'asc';

  colColors = {
    todo: '#E7EAEF',
    progress: '#E7EAEF',
    done: '#E7EAEF',
  };
  showTodoColors: boolean = false;
  showProgressColors: boolean = false;
  showDoneColors: boolean = false;

  showSmallForm: boolean = false;

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
          (board) => board._id === this.curentBoardId
        );
        if (curentBoard) {
          this.boardName = curentBoard.name;
          let tasks = curentBoard.tasks;
          this.colColors = curentBoard.colColors;
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

  onOpenAddTaskForm(status: string) {
    this.formsService.openAddTaskForm(status);
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
      this.userDataService.changeTaskStatus(
        this.curentBoardId,
        this.currentDraggableTask.id,
        status
      );
    }
  }

  onShowColors(columnStatus: string) {
    switch (columnStatus) {
      case 'todo':
        this.showTodoColors = !this.showTodoColors;
        break;
      case 'progress':
        this.showProgressColors = !this.showProgressColors;
        break;
      case 'done':
        this.showDoneColors = !this.showDoneColors;
        break;
    }
  }

  onSetColor(columnStatus: string, newColor: string) {
    switch (columnStatus) {
      case 'todo':
        this.showTodoColors = false;
        break;
      case 'progress':
        this.showProgressColors = false;
        break;
      case 'done':
        this.showDoneColors = false;
        break;
    }
    this.userDataService.setBoardColor(
      this.curentBoardId,
      columnStatus,
      newColor
    );
  }

  onToggleFilterFormShow() {
    this.showSmallForm = !this.showSmallForm;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
