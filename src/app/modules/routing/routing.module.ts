// Angular
import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  UrlSerializer,
  UrlTree,
  DefaultUrlSerializer
} from '@angular/router';
// Modules
import { SharedModule } from '../../shared/shared.module';
// Models
import { Group } from '../security/model/group.model';
import { AccessUnauthorizedComponent } from './containers/access-unauthorized/access-unauthorized.component';
// Services
import { InternalServerErrorComponent } from './containers/internal-server-error/internal-server-error.component';
// Pages
import { PageNotFoundComponent } from './containers/page-not-found/page-not-found.component';
import { AssetTileAccessUnauthorizedComponent } from './containers/asset-tile-access-unauthorized/asset-tile-access-unauthorized.component';

/* Routes */
const routes: Routes = [
  {
    path: 'servicerequest/:serviceRequestNumber/asset/site/:siteId',
    component: AssetTileAccessUnauthorizedComponent
  },
  {
    path: 'servicerequest/:serviceRequestNumber',
    loadChildren: () => import('../pcr-workflow/pcr-workflow.module').then(m => m.PcrWorkflowModule),
    data: {
      groups: [Group.CUSTOMER, Group.SERVICE_CENTER]
    }
  },
  {
    path: 'servicerequest/:serviceRequestNumber/asset/:assetId/site/:siteId',
    loadChildren: () => import('../pcr2-workflow/pcr2-workflow.module').then(m => m.Pcr2WorkflowModule),
    data: {
      groups: [Group.CUSTOMER, Group.SERVICE_CENTER]
    }
  },
  { path: '401', component: AccessUnauthorizedComponent },
  { path: '500', component: InternalServerErrorComponent },
  { path: '**', component: AccessUnauthorizedComponent }
];

@NgModule({
  imports: [SharedModule, RouterModule.forRoot(routes)],
  providers: [],
  declarations: [
    PageNotFoundComponent,
    InternalServerErrorComponent,
    AccessUnauthorizedComponent,
    AssetTileAccessUnauthorizedComponent
  ],
  exports: [RouterModule]
})
export class RoutingModule implements UrlSerializer {
  parse(url: string): UrlTree {
    let defaulturlserializer = new DefaultUrlSerializer();
    if (/\/\//.test(url)) {
      url = url.replace(/\/\//, '/');
    }
    return defaulturlserializer.parse(url);
  }

  serialize(tree: UrlTree): string {
    let defaulturlserializer = new DefaultUrlSerializer(),
      path = defaulturlserializer.serialize(tree);
    return path;
  }
}
