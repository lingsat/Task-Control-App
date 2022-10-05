import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/features/models/board.model';
import { FormsService } from 'src/app/features/services/forms.service';
import { UserDataService } from 'src/app/features/services/user-data.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;

  showControls: boolean = false;
  showComments: boolean = false;

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
    this.formsService.setEditedTaskId(
      this.task.id,
      this.task.name,
      this.task.status
    );
  }

  onArchiveTask() {
    this.userDataService.archiveTask(this.task.boardId, this.task.id);
  }

  onToggleComments() {
    this.showComments = !this.showComments;
  }

  onDeleteComment(commentIndex: number) {
    this.task.comments.splice(commentIndex, 1);
    this.task.commentsCounter = this.task.comments.length;
    this.userDataService.deleteTaskComment(
      this.task.boardId,
      this.task.id,
      commentIndex
    );
  }

  onSubmit(form: NgForm) {
    this.task.comments.push(form.value.comment);
    this.task.commentsCounter = this.task.comments.length;
    this.userDataService.addTaskComment(
      this.task.boardId,
      this.task.id,
      form.value.comment
    );
    form.reset();
  }
}
