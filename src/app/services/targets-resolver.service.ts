import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { DashboardService } from './dashboard.service';
import { TargetAsset } from '../models/target-asset.model';

@Injectable()
export class TargetsResolverService implements Resolve<TargetAsset[]> {
  constructor(private dashboardService: DashboardService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): TargetAsset[] | Observable<TargetAsset[]> | Promise<TargetAsset[]> {
    const targets = this.dashboardService.getTargets();

    if (targets.length === 0) {
      return this.dashboardService.getMethod();
    } else {
      return targets;
    }
  }
}
