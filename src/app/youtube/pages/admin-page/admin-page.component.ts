import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as CardActions from '../../../redux/actions/cards.actions';
import { ICustomCard } from '../../models/custom-card.model';
import { DateValidator } from '../../validators/date.validator';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  providers: [FormBuilder],
})
export class AdminPageComponent {
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

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {}

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
    const card: ICustomCard = { ...this.adminForm.value };
    card.id = Math.random().toString(36).slice(2, 6);
    this.store.dispatch(CardActions.addCustomCard({ card }));
    this.router.navigateByUrl('search');
  }
}
