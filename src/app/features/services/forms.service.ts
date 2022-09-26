import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  showAddBoardForm: boolean = false;
  showAddTaskForm: boolean = false;

  constructor() { }
  
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
}
