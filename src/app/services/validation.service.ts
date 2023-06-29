import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  getError(form: FormGroup, key: string, message: any) {
    const field = form.get(key);
    if (field) {
      if (field.errors) {
        if (field.hasError('required') && field.dirty) {
          return message[key].required;
        }

        if (field.hasError('pattern') && !field.hasError('required')) {
          return message[key].pattern;
        }
      }
    }
  }
}
