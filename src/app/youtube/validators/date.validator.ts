import { FormControl } from '@angular/forms';

export interface ValidationResult {
  [key: string]: boolean;
}

export class DateValidator {
  public static check(control: FormControl): ValidationResult | null {
    const today = new Date().getTime();
    if (!(control && control.value)) {
      return null;
    }
    return new Date(Date.parse(control.value)).getTime() > today ? { invalidDate: true } : null;
  }
}
