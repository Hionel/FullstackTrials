import { Component } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

interface IList {
  _id: string;
  title: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  listData: IList[] = [];
  constructor(private todoService: TodoService) {
    this.todoService.getData().then((result) => {
      this.listData = result as unknown as IList[];
    });
  }
}
