import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";
import { validationMessages } from '../../shared/form-errors';

@Component({
  selector: 'form-errors',
  template: `<div class="alert alert-danger">
    
              <div *ngFor="let fieldError of fieldErrors">{{ errorsMessages[fieldName][fieldError] }}</div>
    
            </div>`,
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent implements OnInit {
  @Input() fieldName: string;
  @Input() errors: any;

  fieldErrors;

  errorsMessages = validationMessages;

  constructor() { }

  ngOnInit() {
    this.collectFieldErrors();

    //console.log('field', this.field);
  }
  //
  // ngOnChanges(changes: SimpleChanges) {
  //   if (!changes.field) { return; }
  //   if (!changes.field.currentValue) { return; }
  //
  //   this.field = changes.field.currentValue;
  //   this.collectFieldErrors();
  // }
  //
  collectFieldErrors() {
    this.fieldErrors = Object.keys(this.errors);
    console.log(this.fieldErrors);
  }

}
