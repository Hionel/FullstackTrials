import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SnackbarNotificationService } from './snackbar-notification.service';

interface IResponse {
  status: string;
  msg?: string;
  data?: string | string[];
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private snackbarService: SnackbarNotificationService) {}
  postTask = (taskFG: FormGroup) => {
    const taskData = taskFG.value;
    const raw = JSON.stringify({
      taskData,
    });

    fetch('http://localhost:4100/home/postTask', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: raw,
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((result: IResponse) => {
        console.log(result);
      })
      .catch((error) => this.snackbarService.openErrorSnack(error.msg!));
  };

  getData = async () => {
    return await fetch('http://localhost:4100/home/getList', {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((result: IResponse) => {
        console.log(result);
        return result.data;
      })
      .catch((error) => this.snackbarService.openErrorSnack(error.msg!));
  };
}
