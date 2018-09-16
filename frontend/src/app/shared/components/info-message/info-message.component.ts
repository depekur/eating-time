import { Component, OnDestroy, OnInit } from '@angular/core';
import { INFO_MESSAGE_TYPE, InfoMessage } from './info-message.model';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { APP_EVENTS, IAppState } from '../../../store';

@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['./info-message.component.scss']
})
export class InfoMessageComponent implements OnInit, OnDestroy {
  @select('infoMessage') messageObservable: Observable<InfoMessage>;

  message: InfoMessage = null;

  INFO_MESSAGE_TYPE = INFO_MESSAGE_TYPE;

  private infoMessageSubscription: Subscription;
  private deleteMessageTimeout;

  constructor(private ngRedux: NgRedux<IAppState>) {
  }

  ngOnInit() {
    this.infoMessageSubscription = this.messageObservable.subscribe(
      (message: InfoMessage) => {
        this.message = message;

        if (message) {
          this.deleteMessageTimeout = setTimeout(() => {
            this.closeInfoMessage();
          }, 6000);
        }
      }
    )
  }

  onClick() {
    clearTimeout(this.deleteMessageTimeout);
    this.closeInfoMessage();
  }

  ngOnDestroy() {
    this.infoMessageSubscription.unsubscribe();
  }

  private closeInfoMessage() {
    this.ngRedux.dispatch({type: APP_EVENTS.HIDE_INFO_MESSAGE});
  }

}
