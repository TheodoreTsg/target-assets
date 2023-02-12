import { Component, OnInit } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { TargetAsset } from "../models/target-asset.model";
import { DashboardServiceService } from "../services/dashboard-service.service";
import { TargetStatus } from "../shared/enums";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ["dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  targetAssets: TargetAsset[] = [];
  isFetching: boolean = false;
  totalCpusPie: any;
  readyPie: any;
  statusPie: any;
  targetStatus = TargetStatus;

  data: any = {
    labels: ["Total Cpus"],
    datasets: [
      {
        data: [300],
        backgroundColor: ["#42A5F5"],
        hoverBackgroundColor: ["#64B5F6"],
      },
    ],
  };

  constructor(private dashboardService: DashboardServiceService) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.dashboardService
      .getMethod()
      .pipe(
        map((targets: TargetAsset[]) => {
          return targets.filter((x) => x != null);
        })
      )
      .pipe(
        tap((targets: TargetAsset[]) => {
          let cpuCounter = 0;
          let notReadyCounter = 0;
          let readyCounter = 0;
          let runningCounter = 0;
          let stoppedCounter = 0;
          let failedCounter = 0;
          let unknownCounter = 0;
          targets.forEach((element) => {
            console.log(element);
            cpuCounter = cpuCounter + element.cpu;
            element.isStartable === false ? notReadyCounter++ : null;
            element.isStartable === true ? readyCounter++ : null;
            element.status === "Running" ? runningCounter++ : null;
            element.status === "Stopped" ? stoppedCounter++ : null;
            element.status === "MigrationFailed" ? failedCounter++ : null;
            element.status === "Unknown" ? unknownCounter++ : null;
          });

          this.totalCpusPie = {
            labels: ["Total Cpus"],
            datasets: [
              {
                data: [cpuCounter],
                backgroundColor: ["#42A5F5"],
                hoverBackgroundColor: ["#64B5F6"],
              },
            ],
          };
          this.readyPie = {
            labels: ["Ready", "Not Ready"],
            datasets: [
              {
                data: [readyCounter, notReadyCounter],
                backgroundColor: ["#66BB6A", "#FFA726"],
                hoverBackgroundColor: ["#81C784", "#FFB74D"],
              },
            ],
          };
          this.statusPie = {
            labels: [
              this.targetStatus.Running,
              this.targetStatus.Stopped,
              this.targetStatus.MigrationFailed,
              this.targetStatus.Unknown,
            ],
            datasets: [
              {
                data: [
                  runningCounter,
                  failedCounter,
                  stoppedCounter,
                  unknownCounter,
                ],
                backgroundColor: ["green", "red", "orange", "darkgrey"],
                hoverBackgroundColor: [
                  "#00A800",
                  "#FF5252",
                  "#FFC65C",
                  "#858585",
                ],
              },
            ],
          };
        })
      )
      .subscribe((targets: TargetAsset[]) => {
        setTimeout(() => {
          this.isFetching = false;
        }, 2000);

        this.targetAssets = targets;

        console.log(this.targetAssets);
      });
  }

  getHighlight(status: string): string {
    let tempStatus = "";
    switch (status) {
      case "Running":
        tempStatus = "status-running";
        break;
      case "Stopped":
        tempStatus = "status-stopped";
        break;
      case "MigrationFailed":
        tempStatus = "status-failed";
        break;
      case "Unknown":
        tempStatus = "status-unknown";
        break;
    }
    return tempStatus;
  }
}