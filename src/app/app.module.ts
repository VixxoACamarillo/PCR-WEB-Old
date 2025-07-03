import { DatePipe } from '@angular/common';
import { NgZone } from '@angular/core';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpHeaders
} from '@angular/common/http';

import { ListViewModule } from '@progress/kendo-angular-listview';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, UrlSerializer } from '@angular/router';
/* State */
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
/* Components */
import { AppComponent } from './app.component';
import { metaReducers, reducers } from './app.reducer';
import { RoutingModule } from './modules/routing/routing.module';
/* Modules */
import { SecurityModule } from './modules/security/security.module';
/* Globally Available Services */
import { AuthGuard } from './modules/security/service/auth-guard.service';
import { AuthService } from './modules/security/service/auth.service';
import { UserService } from './modules/users/service/user.service';
import {
  HttpFactory,
  HttpRequestInterceptor
} from './shared/providers/http-request-interceptor.provider';
import { DataTransferService } from './shared/services/data-transfer.service';
import { DateTimeService } from './shared/services/datetime.service';
import { ErrorService } from './shared/services/error.service';
import { FilterService } from './shared/services/filter.service';
import { LocalStorageService } from './shared/services/local-storage.service';
import { NotifierService } from './shared/services/notifier.service';
/* Services */
import { VixxoApiService } from './shared/services/vixxo-api.service';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { TabSelectorComponent } from './shared/app-tab-selector/app-tab-selector.component';

@NgModule({
  imports: [
    HttpClientModule,
    SecurityModule,
    RouterModule.forRoot([], { enableTracing: false }), // flip to true to see router lifecycle in console
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    SharedModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    ListViewModule,
    RoutingModule,
    LayoutModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    FilterService,
    VixxoApiService,
    DateTimeService,
    ErrorService,
    DatePipe,
    DataTransferService,
    UserService,
    LocalStorageService,
    NotifierService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      useFactory: HttpFactory,
      deps: [NotifierService, LocalStorageService, AuthService],
      multi: true
    },
    { provide: UrlSerializer, useClass: RoutingModule }
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
