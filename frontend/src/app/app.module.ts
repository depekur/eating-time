import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtService } from './services/jwt.service';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';

import { SharedModule } from './shared/shared.module';
import { CustomValidations } from './shared/custom-validation';

import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { IAppState, INITIAL_STATE, rootReducer } from "./store";
import { CommentsComponent } from './components/comments/comments.component';
import { IngredientsSelectComponent } from './components/ingredients-select/ingredients-select.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    CommentsComponent,
    IngredientsSelectComponent
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NgReduxModule
  ],
  providers: [
    JwtService,
    CustomValidations
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>,
              devTools: DevToolsExtension) {
    // Tell @angular-redux/store about our rootReducer and our initial state.
    // It will use this to create a redux store for us and wire up all the
    // events.
    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE,
      null,
      devTools.isEnabled() ? [ devTools.enhancer() ] : []);
  }
}
