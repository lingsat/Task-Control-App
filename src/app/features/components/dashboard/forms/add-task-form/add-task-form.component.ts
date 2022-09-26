import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsService } from 'src/app/features/services/forms.service';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss']
})
export class AddTaskFormComponent implements OnInit {

  constructor(private formsService: FormsService) { }

  ngOnInit(): void {
  }

  onCloseAddTaskModal() {
    this.formsService.closeAddTaskForm();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    form.reset();
    this.onCloseAddTaskModal();
  }

}
