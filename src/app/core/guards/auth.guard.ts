import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(private router: Router) {}

  public canActivate(): boolean {
    return this.canLoad();
  }

  public canLoad(): boolean {
    if (window.localStorage.getItem('userToken') !== null) {
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          accessDenied: true,
        },
      });
      return false;
    }
  }
}
