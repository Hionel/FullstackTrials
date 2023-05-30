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
  listData?: IList[];
  userID!: string;
  constructor(
    private todoService: TodoService,
    private cookieService: CookiesService
  ) {
    this.cookieService.getTokenCookie();
    this.userID = this.cookieService.userID;
    this.getTasksList(this.userID);
  }

  addTaskToList(task: IList) {
    // Add the submitted task to the listData
    console.log(task);
    this.listData?.push(task);
  }

  getTasksList = async (userIdentifier: string) => {
    return await this.todoService.getData(userIdentifier).then((result) => {
      this.listData = result as IList[];
    });
  };
}
