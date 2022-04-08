import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { PasswordValidator } from '../../validators/password.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public hide: boolean = true;
  public userForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, PasswordValidator.check]],
  });

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {}

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  public onLogin() {
    const emailInput = this.userForm.value.email;
    const endSlice = emailInput.indexOf('@') !== -1 ? emailInput.indexOf('@') : emailInput.length;
    const userName = emailInput.slice(0, endSlice);

    this.authService.login(userName);
    this.router.navigate(['']);
  }
}
