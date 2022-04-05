import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public user: IUser = {
    email: '',
    password: '',
    name: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  public onSubmit() {
    const emailInput = <HTMLInputElement>document.querySelector('.user-email');
    if (emailInput && emailInput.value) this.user.email = emailInput.value;
    const passInput = <HTMLInputElement>document.querySelector('.user-pass');
    if (passInput && passInput.value) this.user.password = passInput.value;
    const endSlice =
      this.user.email.indexOf('@') !== -1 ? this.user.email.indexOf('@') : this.user.email.length;
    this.user.name = this.user.email.slice(0, endSlice);

    this.authService.login(this.user);
    this.router.navigate(['']);
  }
}
