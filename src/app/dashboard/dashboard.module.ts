import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";

import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { FileSizeTransformPipe } from "../pipes/file-size-transform.pipe";
import { ShortenPipePipe } from "../pipes/shorten-pipe.pipe";
import { StatusPipe } from "../pipes/status.pipe";

import {ChartModule} from 'primeng/chart';

@NgModule({
  declarations: [DashboardComponent, FileSizeTransformPipe, ShortenPipePipe, StatusPipe],
  imports: [CommonModule, DashboardRoutingModule, ButtonModule, CardModule, ChartModule],
})
export class DashboardModule {}
