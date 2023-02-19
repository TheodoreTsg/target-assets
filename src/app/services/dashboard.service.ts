import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TargetAsset } from '../models/target-asset.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  targetAssets: TargetAsset[] = [];

  constructor(private http: HttpClient) {}

  getMethod() {
    return this.http
      .get<TargetAsset[]>(
        'https://adb47d56-1aa9-4aa7-8ec2-77a923b80a5b.mock.pstmn.io/targetasset'
      )
      .pipe(
        map((targets: TargetAsset[]) => {
          return targets.filter((x) => x != null);
        })
      );
  }

  getTargets(): TargetAsset[] {
    return this.targetAssets.slice();
  }

  setTargets(targets: TargetAsset[]): void {
    this.targetAssets = targets;
  }

  getHighlight(status: string): string {
    let tempStatus = '';
    switch (status) {
      case 'Running':
        tempStatus = 'status-running';
        break;
      case 'Stopped':
        tempStatus = 'status-stopped';
        break;
      case 'MigrationFailed':
        tempStatus = 'status-failed';
        break;
      case 'Unknown':
        tempStatus = 'status-unknown';
        break;
    }
    return tempStatus;
  }
}
