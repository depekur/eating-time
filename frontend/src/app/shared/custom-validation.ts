import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { patterns } from './form-patterns';

@Injectable()
export class CustomValidations {

  // just for example
  customValidation(input: FormControl) {
    const validation = input.value.length > 5;

    return validation ? null : { customError: true };
  }

  passwordPattern(input: FormControl) {
    const value = input.value;

    if (!value) { return null; }

    if (!(value.match(patterns.passNumbers) && value.match(patterns.passLetters))) {
      return { passwordPattern: true };
    } else {
      return null;
    }
  }
}
