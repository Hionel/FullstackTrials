import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IList } from 'src/app/interfaces/ilist';
import { CookiesService } from 'src/app/services/cookies.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent {
  // USING THE INPUT DECORATOR I HAD NO VALUE FOR IT WHYYYY THOOO ?
  userID?: string;
  todoForm: FormGroup;
  @Output() taskSubmitted: EventEmitter<IList> = new EventEmitter<IList>();
  constructor(
    private todoService: TodoService,
    private cookieService: CookiesService
  ) {
    this.userID = this.cookieService.userID;
    this.todoForm = new FormGroup({
      uid: new FormControl(this.userID),
      title: new FormControl('', Validators.required),
    });
  }

  submitTask = () => {
    this.taskSubmitted.emit(this.todoForm.value);
    this.todoService.postTask(this.todoForm);
  };
}
