import { Component, OnInit } from '@angular/core';
import { DateParser, IParsedDate } from "../shared/DateParser";

@Component({
  selector: 'app-ration',
  templateUrl: './ration.component.html',
  styleUrls: ['./ration.component.scss']
})
export class RationComponent implements OnInit {
  day: number;

  constructor() { }

  ngOnInit() {
    this.day = new Date().getTime();
  }
}
