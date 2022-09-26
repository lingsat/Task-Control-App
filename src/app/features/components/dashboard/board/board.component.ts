import { Component, OnInit } from '@angular/core';
import { FormsService } from 'src/app/features/services/forms.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(public formsService: FormsService) { }

  ngOnInit(): void {}

  onOpenAddTaskForm() {
    this.formsService.openAddTaskForm();
  }

}
