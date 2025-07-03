import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicerequestGuard } from '../../service/servicerequest.guard';
import { Pcr2LandingComponent } from './components/pcr2-landing/pcr2-landing.component';

const routes: Routes = [
  {
    path: '',
    component: Pcr2LandingComponent,
    canActivate: [ServicerequestGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Pcr2WorkflowRoutingModule {}
