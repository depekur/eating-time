import { Component, OnInit } from '@angular/core';
import { CustomSelect } from "../../shared/model/custom-select.model";

@Component({
  selector: 'app-ingredients-select',
  templateUrl: './ingredients-select.component.html',
  styleUrls: ['./ingredients-select.component.scss']
})
export class IngredientsSelectComponent extends CustomSelect implements OnInit {

  constructor() {
    super(true);
  }

  ngOnInit() {
  }

}
