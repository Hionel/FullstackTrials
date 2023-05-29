import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent {
  constructor(private todoService: TodoService) {}
  todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
  });
  submitTask = () => {
    this.todoService.postTask(this.todoForm);
  };
}
