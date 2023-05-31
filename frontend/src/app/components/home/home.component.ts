import { Component } from '@angular/core';
import { IList } from 'src/app/interfaces/ilist';
import { CookiesService } from 'src/app/services/cookies.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  listData?: IList[] = [];
  userID!: string;
  editableTask: boolean = false;
  constructor(
    private todoService: TodoService,
    private cookieService: CookiesService
  ) {
    this.cookieService.getTokenCookie();
    this.userID = this.cookieService.userID;
    this.getTasksList(this.userID);
  }

  addTaskToList(task: IList) {
    console.log(this.listData);
    console.log(task);
    if (task.title === '' || !task.title) {
      return;
    }
    for (const taskItem of this.listData!) {
      if (taskItem.title === task.title) {
        return;
      }
    }
    return this.listData?.push(task);
  }

  getTasksList = async (userIdentifier: string) => {
    return await this.todoService.getData(userIdentifier).then((result) => {
      for (const taskItem of result!) {
        taskItem.editable = false;
      }
      this.listData = result as IList[];
    });
  };

  editItem = (task: IList) => {
    return (task.editable = !task.editable);
  };

  saveNewTask = (task: IList, newValue: string) => {
    console.log(task);
    console.log(newValue);
    task.editable = !task.editable;
    task.title = newValue;
    this.todoService.updateTask(task._id, newValue);
  };
  deleteItem = (task: IList) => {
    const index = this.listData?.indexOf(task);
    this.listData?.splice(index!, 1);
    this.todoService.deleteTask(task);
  };
}
