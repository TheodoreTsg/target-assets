import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TargetAsset } from 'src/app/models/target-asset.model';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.css'],
})
export class DetailComponent implements OnInit {
  targetAsset: TargetAsset = new TargetAsset();
  parentTargetName: string = '';

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.dashboardService.getTargets().find((x: TargetAsset) => {
        if (x.id === +params['id']) {
          this.targetAsset = x;
          this.dashboardService.getTargets().find((name) => {
            name.id === this.targetAsset.parentId
              ? (this.parentTargetName = name.name)
              : null;
          });
        }
        x.id === +params['id'] ? (this.targetAsset = x) : null;
      });
    });
  }

  getHighlight(status: string): string {
    return this.dashboardService.getHighlight(status);
  }

  onNavigateToParent() {
    this.router.navigateByUrl('/dashboard/assets/' + this.targetAsset.parentId);
  }
}
