import {Component, Input, OnInit} from '@angular/core';
import { DateParser, IParsedDate } from "../../shared/DateParser";

interface IDays {
  current: IParsedDate;
  next: IParsedDate;
  prev: IParsedDate;
}

@Component({
  selector: 'rationator',
  templateUrl: './rationator.component.html',
  styleUrls: ['./rationator.component.scss']
})
export class RationatorComponent implements OnInit {
  @Input() currentDay: number;
  days: IDays;

  constructor() { }

  ngOnInit() {
    this.days = {
      current: DateParser.parse(this.currentDay),
      next: DateParser.nextDay(this.currentDay),
      prev: DateParser.prevDay(this.currentDay),
    };

    console.log(this.days);
  }

}
