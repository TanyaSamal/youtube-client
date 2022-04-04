import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUser, UserInfo } from 'src/app/auth/models/user.model';

@Injectable()
export class AuthService {
  public data$: Observable<UserInfo>;
  private userInfo$ = new Subject<UserInfo>();

  constructor() {
    this.data$ = this.userInfo$.asObservable();
  }

  public updatedDataSelection(data: UserInfo): void {
    this.userInfo$.next(data);
  }

  public login(user: IUser): void {
    const token = Math.random().toString(36);
    this.updatedDataSelection({
      isAuth: true,
      userName: user.name,
    });
    window.localStorage.setItem('userToken', token);
    window.localStorage.setItem('userName', user.name);
  }

  public logout(): void {
    window.localStorage.removeItem('userToken');
    window.localStorage.removeItem('userName');
    this.updatedDataSelection({
      isAuth: false,
      userName: '',
    });
  }
}
