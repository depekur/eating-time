import {Component, Input} from "@angular/core";

@Component({
  selector: 'tabs',
  template: `
    <ul class="tabs-nav"
        [ngClass]="classes">
      <li class="nav-item btn"
          *ngFor="let tab of tabs" (click)="selectTab(tab)">
        <a class="nav-link"
           [class.disabled]="tab.disabled"
           [class.active]="tab.active">
          <span>{{tab.tabTitle}}</span>
        </a>
      </li>
    </ul>

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
  @Input() disabled: boolean = false;

  active: boolean = false;

  constructor(tabs:Tabs) {
    tabs.addTab(this);
  }
}
