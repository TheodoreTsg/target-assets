import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TargetAsset } from '../models/target-asset.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  targetAssetsChanged = new Subject<TargetAsset[]>();

  constructor(private http: HttpClient) {}

  getMethod() {
    return this.http.get<TargetAsset[]>(
      'https://adb47d56-1aa9-4aa7-8ec2-77a923b80a5b.mock.pstmn.io/targetasset'
    );
  }
}
