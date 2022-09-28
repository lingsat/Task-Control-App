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

  constructor(
    private formsService: FormsService,
    private userDataService: UserDataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.currentBoardId = data['id'];
    });
  }

  onCloseAddTaskModal() {
    this.formsService.closeAddTaskForm();
  }

  onSubmit(form: NgForm) {
    this.userDataService.addTask(this.currentBoardId, form.value.task, form.value.taskState);
    form.reset();
    this.onCloseAddTaskModal();
  }
}
