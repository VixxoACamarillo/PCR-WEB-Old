import { NgModule } from '@angular/core';
// Modules
import { SharedModule } from '../../shared/shared.module';
import { PcrLandingComponent } from './components/pcr-landing/pcr-landing.component';
import { PcrWorkflowRoutingModule } from './pcr-workflow-routing.module';
import { PcrSuccessComponent } from './components/pcr-success/pcr-success.component';

@NgModule({
  imports: [SharedModule, PcrWorkflowRoutingModule],
  declarations: [PcrLandingComponent, PcrSuccessComponent],
  exports: [PcrLandingComponent]
})
export class PcrWorkflowModule {}
