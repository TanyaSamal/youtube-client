import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser, UserInfo } from 'src/app/auth/models/user.model';
import * as Utils from '../../auth/utils/utils';

@Injectable()
export class AuthService {
  data$: Observable<UserInfo>;
  private userInfo$ = new BehaviorSubject<UserInfo>({ isAuth: false, userName: '' });

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
  }

  logout(): void {
    window.localStorage.removeItem('userToken');
    this.updatedDataSelection({
      isAuth: false,
      userName: '',
    });
  }
}
