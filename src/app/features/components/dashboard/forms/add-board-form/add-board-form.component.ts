import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsService } from 'src/app/features/services/forms.service';

@Component({
  selector: 'app-add-board-form',
  templateUrl: './add-board-form.component.html',
  styleUrls: ['./add-board-form.component.scss']
})
export class AddBoardFormComponent implements OnInit { 
  constructor(private formsService: FormsService) { }

  ngOnInit(): void {}

  onCloseAddBoardModal() {
    this.formsService.closeAddBoardForm();
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    form.reset();
    this.onCloseAddBoardModal();
  }

}
