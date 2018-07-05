import { Component, Input, OnInit, OnDestroy, forwardRef } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import { CustomSelect } from "../../shared/model/custom-select.model";

@Component({
  selector: 'custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ]
})
export class CustomSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() data: any;
  @Input() title: string|boolean = false;
  @Input() multiple: boolean = true;
  @Input() showSelected: boolean = false;
  @Input() categories: boolean|any = false;
  @Input() disabled: boolean = false;


  constructor() {}

  ngOnInit() {
    this.data = this.data.map((item) => new CustomSelect(item));
  }

  ngOnDestroy() {
    this.data = null;
  }

  writeValue(selected: any, update: boolean = true) {
    if (update && selected) {
      this.data.forEach(item => {
        item.selected = false;

        selected.forEach(selectedItem => {
          if (item.id === selectedItem.id) {
            item.selected = true;
          }
        });
      });
    }

    this.onChange(selected);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  onChange(_: any): void {}

  propagateTouch(_: any): void {}

  toggleSelected(item) {
    if (this.isDisabled() && !item.selected) return;

    item.selected = !item.selected;

    this.writeValue(this.selected, false);
  }

  get selected() {
    return this.data.filter(item => item.selected);
  }

  isDisabled() {
    return !this.multiple && this.selected.length;
  }
}
