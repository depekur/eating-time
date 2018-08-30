import {AfterViewInit, Directive, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[stick]'
})
export class StickDirective implements OnInit, AfterViewInit {
  elementHeight:number;
  elementWidth:number;
  scroll:number;
  viewHeight:number;
  footerPos:number;
  footerHeight:number;
  oldScroll: number;
  elementOffsetTop: number;
  fullElementOffset:number;
  viewedOffset:number;
  scrollToTop:boolean;
  elementOffsetTopDynamic:any;

  coordinates: any = {
    absoluteToTop: 0,
    fixedToTop: 0
  };

  constructor( private el: ElementRef<HTMLElement>,
               private renderer: Renderer2) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.setState(true);

    window.addEventListener('scroll', () => {
      this.setState();
      this.stickSidebarNav();

      this.debug();
    });
  }

  setState(full: boolean = false) {
    if (full) {
      this.elementOffsetTop = this.el.nativeElement.getBoundingClientRect().top;
    }

    this.elementOffsetTopDynamic = this.el.nativeElement.getBoundingClientRect().top;

    let footer: any = document.querySelectorAll('app-footer');

    this.elementHeight = this.el.nativeElement.getBoundingClientRect().height;
    this.elementWidth = this.el.nativeElement.getBoundingClientRect().width;
    this.scroll = window.pageYOffset;
    this.viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    this.footerPos = footer[0].offsetTop;
    this.footerHeight = footer[0].clientHeight;
    // fullHeight: Math.max(
    //   document.body.scrollHeight, document.documentElement.scrollHeight,
    //   document.body.offsetHeight, document.documentElement.offsetHeight,
    //   document.body.clientHeight, document.documentElement.clientHeight
    // )

    this.scrollToTop = this.oldScroll > this.scroll;

    this.oldScroll = this.scroll;
    this.fullElementOffset = this.elementOffsetTop + this.elementHeight;
    this.viewedOffset = this.scroll + this.viewHeight;
  }

  stickSidebarNav() {
    if (this.fullElementOffset < this.viewedOffset) {
      if (this.scrollToTop && this.scroll > this.elementOffsetTop) {

        this.coordinates.absoluteToTop = this.coordinates.absoluteToTop ?
          this.coordinates.absoluteToTop :
          this.scroll - this.viewHeight + this.elementOffsetTop;

        this.setAbsolute(this.coordinates.absoluteToTop);

        // if (this.coordinates.absoluteToTop && (this.coordinates.absoluteToTop < (this.scroll - this.elementOffsetTop))) { // когда еще не до верху прокручена
          // this.coordinates.fixedToTop = this.coordinates.fixedToTop ?
          //                               this.coordinates.fixedToTop :
          //                               this.scroll;
          //
          // this.setFixedToTop(this.coordinates.fixedToTop);
        // } else {
        //   this.setAbsoluteToTop();
        // }
      } else {
        this.coordinates.absoluteToTop = 0;

        let fixedTop;

        if (this.viewHeight < this.elementHeight) {
          fixedTop = this.viewHeight - this.elementHeight - 10;
        } else {
          fixedTop = 10;
        }

        this.setFixed(fixedTop);
      }


    } else {
      this.unsetFixed();
    }

    if ((this.footerPos - this.viewHeight) < this.scroll) {
      let absoluteTop = this.footerPos - this.viewHeight - this.elementHeight + this.elementOffsetTop + 300;

      this.setAbsolute(absoluteTop);
    } else {
      // this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
      // this.renderer.setStyle(this.el.nativeElement, 'top', `${fixedTop}px`);
    }
  }

  setFixed(coordinates) {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'fixed');
    this.renderer.setStyle(this.el.nativeElement, 'top', `${coordinates}px`);
    this.renderer.setStyle(this.el.nativeElement, 'width', `${this.elementWidth}px`);
  }

  setAbsolute(coordinates) {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute');
    this.renderer.setStyle(this.el.nativeElement, 'top', `${coordinates}px`);
  }

  unsetFixed() {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.el.nativeElement, 'width', 'auto');
    this.renderer.removeStyle(this.el.nativeElement, 'top');
  }

  debug() {
    console.log('-----------------------------');
    console.log('fullElementOffset', this.fullElementOffset);
    console.log('elementOffsetTop', this.elementOffsetTop);
    console.log('elementOffsetTopDynamic', this.elementOffsetTopDynamic);
    console.log('coordinates.absoluteToTop', this.coordinates.absoluteToTop);
    console.log('this.scroll - this.elementOffsetTop', this.scroll - this.elementOffsetTop);
    console.log('viewedOffset', this.viewedOffset);
    console.log('scrollToTop', this.scrollToTop);
    console.log('oldScroll', this.oldScroll);
    console.log('scroll', this.scroll);
    console.log('viewHeight', this.viewHeight);
    console.log('footerPos', this.footerPos);
    console.log('elementHeight', this.elementHeight);

    console.log('this.footerPos - this.viewHeight', this.footerPos - this.viewHeight);
    console.log('this.scroll + this.footerHeight', this.scroll + this.footerHeight);


    console.log('footer', document.querySelectorAll('app-footer'));
  }
}
