import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../services/forms.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // boards = []; // temporary 
  boards = [1, 2, 3, 4, 5, 6, 7]; // temporary 

  constructor(public formsService: FormsService) { }

  ngOnInit(): void {}

  onOpenAddBoardModal() {
    this.formsService.openAddBoardForm();
  }

}
