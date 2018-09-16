import {AfterViewInit, Directive, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[stick]'
})
export class StickDirective implements OnInit, AfterViewInit {
  elementHeight: number;
  elementWidth: number;
  scroll: number;
  viewHeight: number;
  footerPos: number;
  footerHeight: number;
  oldScroll: number;
  elementOffsetTop: number;
  fullElementOffset: number;
  viewedOffset: number;
  scrollToTop: boolean;
  elementOffsetTopDynamic: any;

  coordinates: any = {
    absoluteToTop: 0,
    absoluteToBottom: 0,
    fixedToTop: 0,
    fixedToBottom: 0
  };

  constructor(private el: ElementRef<HTMLElement>,
              private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.setState(true);
    this.stickSidebarNav();

    window.addEventListener('scroll', () => {
      this.setState();
      this.stickSidebarNav();

      /**
       *  don`t be afraid to use this function
       *  when something goes wrong
       */
      //this.debug();
    });
  }

  /**
   *  set all params we need to stick all we need
   *  reset it on scroll to work properly
   *
   * @param {boolean} full
   */
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
    this.scrollToTop = this.oldScroll > this.scroll; // scroll direction

    this.oldScroll = this.scroll;
    this.fullElementOffset = this.elementOffsetTop + this.elementHeight;
    this.viewedOffset = this.scroll + this.viewHeight;
  }

  stickSidebarNav() {
    if (this.fullElementOffset < this.viewedOffset) {

      /**
       *  unset fixed position
       *  when element height is smaller that view height
       */
      if ((this.scroll < this.elementOffsetTop) && (this.viewHeight - this.footerHeight) > this.elementHeight) {
        this.unsetFixed();
        this.unsetCoordinates();
      }

      if (this.scrollToTop && (this.scroll > this.elementOffsetTop) && ((this.viewHeight - this.footerHeight) < this.elementHeight)) {

        if (this.elementOffsetTopDynamic > 10) {
          /**
           *  set element fixed
           *  top part on the top of the view
           *  when user scroll to top
           *  and the top part of the element shown on the view
           */
          this.coordinates.fixedToTop = 10;
          this.coordinates.absoluteToTop = 0;
          this.setFixed(this.coordinates.fixedToTop);

          console.log('fixed');

        } else if (this.coordinates.fixedToTop) {
          //this.coordinates.fixedToTop = 0;

          this.coordinates.absoluteToTop = this.coordinates.absoluteToTop ?
            this.coordinates.absoluteToTop :
            this.scroll - this.viewHeight + this.elementOffsetTop;

          console.log('absolute');

          /**
           *  set element absolute
           *  when element already fixed to bottom
           *  and user scroll to top
           */
          //this.setAbsolute(this.coordinates.absoluteToTop);
        }
      } else if (!this.scrollToTop && (this.scroll > this.elementOffsetTop)) {
        this.coordinates.absoluteToTop = 0;

        if (this.viewHeight < this.elementHeight) {
          this.coordinates.fixedToBottom = this.viewHeight - this.elementHeight - 10;
        } else {
          this.coordinates.fixedToBottom = 10;
        }

        /**
         *  fix element when his bottom position is showing in the view
         *  bottom part of element to bottom part of view
         */
        this.setFixed(this.coordinates.fixedToBottom);
      }

      /**
       *  set position absolute
       *  when already user scroll near bottom
       *  so fixed element start scrolling up with page
       */
      if ((this.viewHeight - this.footerHeight) < this.elementHeight) {
        if ((this.footerPos - this.viewHeight) < this.scroll) {
          this.coordinates.absoluteToBottom = this.footerPos - this.fullElementOffset - 30;


          this.setAbsolute(this.coordinates.absoluteToBottom);
        }
      }

    } else if (this.scroll < this.elementOffsetTop) {
      /**
       *  unset fixed position
       *  when element height is bigger that view height
       */
      this.unsetFixed();
      this.unsetCoordinates();
    }
  }

  unsetCoordinates() {
    this.coordinates.fixedToTop = 0;
    this.coordinates.absoluteToTop = 0;
    this.coordinates.fixedToBottom = 0;
    this.coordinates.absoluteToBottom = 0;
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

    // console.log('fixedToBottom', this.coordinates.fixedToBottom);
    // console.log('fixedToTop', this.coordinates.fixedToTop);
    //
    // console.log('fullElementOffset', this.fullElementOffset);
    // console.log('elementOffsetTop', this.elementOffsetTop);
    console.log('elementOffsetTopDynamic', this.elementOffsetTopDynamic);
    //console.log('coordinates.absoluteToTop', this.coordinates.absoluteToTop);
    //console.log('this.scroll - this.elementOffsetTop', this.scroll - this.elementOffsetTop);
    console.log('viewedOffset', this.viewedOffset);
    console.log('scroll', this.scroll);
    console.log('viewHeight', this.viewHeight);
    //console.log('footerPos', this.footerPos);
    //console.log('elementHeight', this.elementHeight);

    //console.log('this.footerPos - this.viewHeight', this.footerPos - this.viewHeight);
    //console.log('this.scroll + this.footerHeight', this.scroll + this.footerHeight);

    console.log('-----------------------------');

    //console.log('footer', document.querySelectorAll('app-footer'));
  }
}
