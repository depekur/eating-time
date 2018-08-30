import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'to-top',
  templateUrl: './to-top.component.html',
  styleUrls: ['./to-top.component.scss']
})
export class ToTopComponent implements AfterViewInit {
  toTop: any;
  scrollHeight:number = 0;
  isVisible:boolean = false;

  constructor() { }

  ngAfterViewInit() {
    this.toTop = document.getElementById('to-top');

    this.scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );

    window.addEventListener('scroll', () => {
      // this.scrollHeight = Math.max(
      //   document.body.scrollHeight, document.documentElement.scrollHeight,
      //   document.body.offsetHeight, document.documentElement.offsetHeight,
      //   document.body.clientHeight, document.documentElement.clientHeight
      // );
      //
      // console.log(this.scrollHeight);

      this.isVisible = window.pageYOffset > 300;
    });
  }


  onClick() {
    window.scrollTo(0, 0);
  }
}
