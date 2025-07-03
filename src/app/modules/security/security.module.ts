import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedirectComponent } from './components/redirect.component';
import { CallbackComponent } from './containers/callback/callback.component';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { authReducer } from './auth.reducer';
import { SharedModule } from '../../shared/shared.module';
import { SecurityRouteModule } from './security.route';



@NgModule({
  declarations: [
    RedirectComponent,
    CallbackComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SecurityRouteModule,
    StoreModule.forFeature('user', authReducer)
  ],
  exports: [RouterModule, CallbackComponent, RedirectComponent]
})
export class SecurityModule { }
