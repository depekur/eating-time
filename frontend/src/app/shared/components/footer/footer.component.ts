import { Component, OnInit } from '@angular/core';
import {CONFIG} from "../../../app-config";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  title: string = CONFIG.siteTitle;

  constructor() { }

  ngOnInit() {
  }

}
