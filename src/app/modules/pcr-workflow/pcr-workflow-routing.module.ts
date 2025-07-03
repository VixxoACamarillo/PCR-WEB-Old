import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PcrLandingComponent } from './components/pcr-landing/pcr-landing.component';
import { PcrSuccessComponent } from './components/pcr-success/pcr-success.component';
import { ServicerequestGuard } from '../../service/servicerequest.guard';

const routes: Routes = [
  {
    path: 'success',
    component: PcrSuccessComponent
  },
  {
    path: '',
    component: PcrLandingComponent,
    canActivate: [ServicerequestGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PcrWorkflowRoutingModule {}
