import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserInfo } from 'src/app/auth/models/user.model';

@Injectable()
export class AuthService {
  public data$: Observable<UserInfo>;
  private userInfo$ = new Subject<UserInfo>();

  constructor() {
    this.data$ = this.userInfo$.asObservable();
  }

  public login(name: string): void {
    const token = Math.random().toString(36);
    this.updatedDataSelection({
      isAuth: true,
      userName: name,
    });
    window.localStorage.setItem('userToken', token);
    window.localStorage.setItem('userName', name);
  }

  public logout(): void {
    window.localStorage.removeItem('userToken');
    window.localStorage.removeItem('userName');
    this.updatedDataSelection({
      isAuth: false,
      userName: '',
    });
  }

  private updatedDataSelection(data: UserInfo): void {
    this.userInfo$.next(data);
  }
}
