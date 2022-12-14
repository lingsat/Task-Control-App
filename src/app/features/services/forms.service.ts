import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  showAddBoardForm: boolean = false;
  editedBoardId!: string;
  editBoardMode: boolean = false;
  editDefaultBoardData: {
    name: string;
    description: string;
  } = {name: '', description: ''};
  
  showAddTaskForm: boolean = false;
  editedTaskId!: string;
  editTaskMode: boolean = false;
  editDefaultTaskName: string = '';
  defaultTaskStatus: string = '';

  constructor() {}

  closeAddBoardForm() {
    this.showAddBoardForm = false;
  }

  openAddBoardForm() {
    this.showAddBoardForm = true;
  }
  
  closeAddTaskForm() {
    this.showAddTaskForm = false;
  }
  
  openAddTaskForm(status: string) {
    this.showAddTaskForm = true;
    this.defaultTaskStatus = status;
  }

  setEditedBoardId(id: string, name: string, description: string) {
    this.editedBoardId = id;
    this.editBoardMode = true;
    this.editDefaultBoardData = { name, description };
    this.openAddBoardForm();
  }

  setEditedTaskId(taskId: string, name: string, status: string) {
    this.editedTaskId = taskId;
    this.editTaskMode = true;
    this.editDefaultTaskName = name;
    this.openAddTaskForm(status);
  }

  clearBoardMode() {
    this.editBoardMode = false;
    this.editDefaultBoardData = { name: '', description: ''};
  }

  clearTaskMode() {
    this.editTaskMode = false;
    this.editDefaultTaskName = '';
  }
}
