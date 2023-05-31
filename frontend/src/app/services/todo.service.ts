import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SnackbarNotificationService } from './snackbar-notification.service';
import { IList } from '../interfaces/ilist';
import { IResponse } from '../interfaces/iresponse';

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
        return response.json();
      })
      .then((result: IResponse) => {
        if (!result.success) {
          return this.snackbarService.openErrorSnack(result.msg!);
        }
        return this.snackbarService.openSuccessSnack(result.msg!);
      })
      .catch((error) => this.snackbarService.openErrorSnack(error.msg!));
  };

  getData = async (userIdentifier: string) => {
    return await fetch(
      'http://localhost:4100/home/getList?' +
        new URLSearchParams({
          uid: userIdentifier,
        }),
      {
        method: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((result: IResponse) => {
        return result.data as unknown as IList[];
      })
      .catch((error) => {
        this.snackbarService.openErrorSnack(error);
      });
  };

  deleteTask = async (task: IList) => {
    const raw = JSON.stringify(task);
    fetch('http://localhost:4100/home/delete', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: raw,
    })
      .then((response) => {
        return response.json();
      })
      .then((result: IResponse) => {
        if (!result.success) {
          return this.snackbarService.openErrorSnack(result.msg!);
        }
        return this.snackbarService.openSuccessSnack(result.msg!);
      })
      .catch((error) => {
        this.snackbarService.openErrorSnack(error);
      });
  };

  updateTask = (taskID: string, newValue: string) => {
    const raw = JSON.stringify({
      taskID: taskID,
      newTitle: newValue,
    });
    fetch('http://localhost:4100/home/update', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: raw,
    })
      .then((response) => {
        return response.json();
      })
      .then((result: IResponse) => {
        if (!result.success) {
          return this.snackbarService.openErrorSnack(result.msg!);
        }
        return this.snackbarService.openSuccessSnack(result.msg!);
      })
      .catch((error) => {
        this.snackbarService.openErrorSnack(error);
      });
  };
}
