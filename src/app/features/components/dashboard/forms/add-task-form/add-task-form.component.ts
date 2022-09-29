import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from 'src/app/features/services/forms.service';
import { UserDataService } from 'src/app/features/services/user-data.service';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss'],
})
export class AddTaskFormComponent implements OnInit {
  currentBoardId!: string;
  editMode: boolean = false;  
  editedTaskId!: string;
  editDefaultName: string = '';

  constructor(
    private formsService: FormsService,
    private userDataService: UserDataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.currentBoardId = data['id'];
    });

    this.editMode = this.formsService.editTaskMode;
    this.editedTaskId = this.formsService.editedTaskId;
    this.editDefaultName = this.formsService.editDefaultTaskName;
  }

  onCloseAddTaskModal() {
    this.formsService.closeAddTaskForm();
    this.formsService.clearTaskMode();
  }

  onSubmit(form: NgForm) {
    if (!this.editMode) {
      this.userDataService.addTask(this.currentBoardId, form.value.task, form.value.taskState);
    } else {
      this.userDataService.editTask(this.currentBoardId, this.editedTaskId, form.value.task);
    }
    form.reset();
    this.formsService.clearTaskMode();
    this.onCloseAddTaskModal();
  }
}
