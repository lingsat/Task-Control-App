import { AfterContentInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormsService } from 'src/app/features/services/forms.service';
import { Board, Task } from 'src/app/features/models/board.model';
import { UserDataService } from 'src/app/features/services/user-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  todoTasks: Task[] = [];
  progressTasks: Task[]= [];
  doneTasks: Task[] = [];
  curentBoardId: string = '';
  boardName: string = ''
  subscription!: Subscription;

  constructor(public formsService: FormsService, private userDataService: UserDataService, private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {   
    this.userDataService.fetchBoards();
    this.activatedRoute.params.subscribe(data => {
      this.curentBoardId = data['id'];
    });

    this.subscription = this.userDataService.getBoardsObs().subscribe(boards => {
      this.cleartasks();
      let curentBoard = boards.find(board => board.id === this.curentBoardId);
      if (curentBoard) {
        this.boardName = curentBoard.name;
        let tasks = curentBoard.tasks;        
        tasks.forEach(task => {
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
        })
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
