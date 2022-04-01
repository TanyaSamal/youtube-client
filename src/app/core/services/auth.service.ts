import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUser, UserInfo } from 'src/app/auth/models/user.model';
import * as Utils from '../../auth/utils/utils';

@Injectable()
export class AuthService {
  data$: Observable<UserInfo>;
  private userInfo$ = new Subject<UserInfo>();

  constructor() {
    this.data$ = this.userInfo$.asObservable();
  }

  updatedDataSelection(data: UserInfo): void {
    this.userInfo$.next(data);
  }

  login(user: IUser): void {
    this.updatedDataSelection({
      isAuth: true,
      userName: user.name,
    });
    window.localStorage.setItem('userToken', Utils.generateToken());
    window.localStorage.setItem('userName', user.name);
  }

  logout(): void {
    window.localStorage.removeItem('userToken');
    window.localStorage.removeItem('userName');
    this.updatedDataSelection({
      isAuth: false,
      userName: '',
    });
  }
}
