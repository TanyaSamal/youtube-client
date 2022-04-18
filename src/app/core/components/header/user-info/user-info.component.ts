import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit, OnDestroy {
  public username = 'Your name';
  public isLoggedIn = false;
  private sub: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit() {
    if (window.localStorage.getItem('userToken')) {
      this.isLoggedIn = !!window.localStorage.getItem('userToken');
      this.username = window.localStorage.getItem('userName')!;
    }
    this.sub = this.authService.data$.subscribe((data) => {
      this.isLoggedIn = data.isAuth;
      this.username = data.userName;
    });
  }

  public ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
