import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateValidator } from '../../validators/date.validator';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  providers: [FormBuilder],
})
export class AdminPageComponent {
  public isCreated = false;
  public adminForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', Validators.maxLength(255)],
    image: [
      '',
      [
        Validators.required,
        Validators.pattern(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/),
      ],
    ],
    video: ['', [Validators.required, Validators.pattern(/(www|http:|https:)+[^\s]+[\w]/)]],
    date: ['', [Validators.required, DateValidator.check]],
  });

  constructor(private fb: FormBuilder) {}

  get title() {
    return this.adminForm.get('title');
  }

  get description() {
    return this.adminForm.get('description');
  }

  get image() {
    return this.adminForm.get('image');
  }

  get video() {
    return this.adminForm.get('video');
  }

  get date() {
    return this.adminForm.get('date');
  }

  createCard() {
    this.isCreated = true;
  }
}
