import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/features/models/board.model';
import { FormsService } from 'src/app/features/services/forms.service';
import { UserDataService } from 'src/app/features/services/user-data.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  showControls: boolean = false;

  constructor(
    private formsService: FormsService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {}

  onToggleControls() {
    this.showControls = !this.showControls;
  }

  onDeleteTask() {
    this.userDataService.deleteTask(this.task.boardId, this.task.id);
  }

  onEditTask() {
    this.formsService.setEditedTaskId(this.task.id, this.task.name);
  }
}
