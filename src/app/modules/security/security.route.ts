import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './containers/callback/callback.component';
import { RedirectComponent } from './components/redirect.component';
import { AccessUnauthorizedComponent } from '../routing/containers/access-unauthorized/access-unauthorized.component';

export const SecurityRoutes: Routes = [
  {
    path: '',
    component: AccessUnauthorizedComponent,
    pathMatch: 'full'
  },
  { path: 'redirect', component: RedirectComponent, pathMatch: 'full' },
  { path: 'callback', component: CallbackComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(SecurityRoutes)]
})
export class SecurityRouteModule {}
