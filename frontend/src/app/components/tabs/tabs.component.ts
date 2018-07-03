import {Component, Input} from "@angular/core";

@Component({
  selector: 'tabs',
  template: `
    <nav class="tabs-nav"
        [ngClass]="classes">
      <div class="tabs-nav__item btn"
          *ngFor="let tab of tabs; let i = index;" 
          (click)="selectTab(tab)"
          [class.disabled]="tab.disabled"
          [class.error]="tab.error"
          [class.active]="tab.active">
        <a class="nav-link nav-item ">
          <span>{{tab.tabTitle}}</span>
        </a>
      </div>
    </nav>

    <div class="tab-wrapper">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./tabs.component.scss']
})
export class Tabs {
  @Input() classes: string;

  tabs: Tab[] = [];

  selectTab(tab: Tab) {
    if (tab.disabled) {
      return;
    }

    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
  }

  addTab(tab: Tab) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }
}

@Component({
  selector: 'tab',
  template: `
    <div class="tab-pane fade show mt-3"
         [class.active]="active"
         [hidden]="!active">
      <ng-content></ng-content>
    </div>
  `
})
export class Tab {
  @Input() tabTitle: string;
  @Input() error: string;
  @Input() disabled: boolean = false;

  active: boolean = false;

  constructor(tabs:Tabs) {
    tabs.addTab(this);
  }
}
