import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TargetsResolverService } from '../services/targets-resolver.service';
import { DashboardComponent } from './dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: MainDashboardComponent,
      },
      {
        path: 'assets/:id',
        component: DetailComponent,
        resolve: [TargetsResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
