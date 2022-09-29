import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsService } from 'src/app/features/services/forms.service';
import { UserDataService } from 'src/app/features/services/user-data.service';

@Component({
  selector: 'app-add-board-form',
  templateUrl: './add-board-form.component.html',
  styleUrls: ['./add-board-form.component.scss']
})
export class AddBoardFormComponent implements OnInit { 
  editMode: boolean = false;
  editedBoardId!: string;
  editDefaultData: {
    name: string;
    description: string;
  } = {name: '', description: ''};

  constructor(private formsService: FormsService, private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.editedBoardId = this.formsService.editedBoardId;
    this.editMode = this.formsService.editBoardMode;
    this.editDefaultData = this.formsService.editDefaultBoardData;
  }

  onCloseAddBoardModal() {
    this.formsService.closeAddBoardForm();
    this.formsService.clearBoardMode();
  }

  onSubmit(form: NgForm) {
    if (!this.editMode) {
      this.userDataService.addBoard(form.value.name, form.value.description);
    } else {
      this.userDataService.editBoard(this.editedBoardId, form.value.name);      
    }
    form.reset();
    this.formsService.clearBoardMode();
    this.onCloseAddBoardModal();
  }

}
