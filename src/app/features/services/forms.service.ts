import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  showAddBoardForm: boolean = false;

  editedBoardId!: string;
  editBoardMode: boolean = false;
  editDefaultData: {
    name: string;
    description: string;
  } = {name: '', description: ''};
  
  showAddTaskForm: boolean = false;

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

  openAddTaskForm() {
    this.showAddTaskForm = true;
  }

  setEditedBoardId(id: string, name: string, description: string) {
    this.editedBoardId = id;
    this.editBoardMode = true;
    this.editDefaultData = { name, description };
    this.openAddBoardForm();
  }

  clearBoardMode() {
    this.editBoardMode = false;
    this.editDefaultData = { name: '', description: ''};
  }
}
