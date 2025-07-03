import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { Pcr2WorkflowRoutingModule } from './pcr2-workflow-routing.module';
import { Pcr2LandingComponent } from './components/pcr2-landing/pcr2-landing.component';
import { PartsComponent } from './components/parts/parts.component';
import { PcrComponent } from './components/pcr/pcr.component';
import { OverviewComponent } from './components/overview/overview.component';
import { NotesComponent } from './components/notes/notes.component';
import { PartLocationComponent } from './components/location/part-location.component';
import { ActionsComponent } from './components/actions/actions.component';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { WorkReportComponent } from './components/work-report/work-report.component';
import { CauseComponent } from './components/cause/cause.component';
import { LayoutModule } from '@progress/kendo-angular-layout';

@NgModule({
  declarations: [
    Pcr2LandingComponent,
    PartsComponent,
    ActionsComponent,
    PcrComponent,
    OverviewComponent,
    NotesComponent,
    PartLocationComponent,
    WorkReportComponent,
    CauseComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    Pcr2WorkflowRoutingModule,
    LayoutModule,
    ListViewModule
  ]
})
export class Pcr2WorkflowModule {}
