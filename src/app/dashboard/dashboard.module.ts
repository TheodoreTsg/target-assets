import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChartModule } from 'primeng/chart';
import { SidebarModule } from 'primeng/sidebar';

import { FileSizeTransformPipe } from '../pipes/file-size-transform.pipe';
import { ShortenPipePipe } from '../pipes/shorten-pipe.pipe';
import { StatusPipe } from '../pipes/status.pipe';
import { DetailComponent } from './detail/detail.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { TargetsResolverService } from '../services/targets-resolver.service';

@NgModule({
  declarations: [
    DashboardComponent,
    FileSizeTransformPipe,
    ShortenPipePipe,
    StatusPipe,
    DetailComponent,
    MainDashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ButtonModule,
    CardModule,
    ChartModule,
    InputTextModule,
    FormsModule,
    MultiSelectModule,
    SidebarModule,
  ],
  providers: [FileSizeTransformPipe, TargetsResolverService],
})
export class DashboardModule {}
