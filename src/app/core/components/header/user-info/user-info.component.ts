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
  username = 'Your name';
  isLoggedIn = false;
  private sub: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.sub = this.authService.data$.subscribe((data) => {
      this.isLoggedIn = data.isAuth;
      this.username = data.userName;
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
