import { Component, OnInit } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { multiSelect } from "../models/multi-select.model";
import { TargetAsset } from "../models/target-asset.model";
import { FileSizeTransformPipe } from "../pipes/file-size-transform.pipe";
import { DashboardService } from "../services/dashboard.service";
import { TargetStatus } from "../shared/enums";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ["dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  targetAssets: TargetAsset[] = [];
  cpTargetAssets: TargetAsset[] = [];
  selectedStatus: any;
  statuses: any;
  isFetching: boolean = false;
  totalCpusRamPie: any;
  readyPie: any;
  statusPie: any;
  pieOptions: any = {
    plugins: {
      legend: {
        position: "left",
      },
    },
  };
  targetStatus = TargetStatus;
  searchText: string = "";

  constructor(
    private dashboardService: DashboardService,
    private fileSizePipe: FileSizeTransformPipe
  ) {
    this.statuses = [
      { name: TargetStatus.Running, code: "Running" },
      { name: TargetStatus.MigrationFailed, code: "MigrationFailed" },
      { name: TargetStatus.Stopped, code: "Stopped" },
      { name: TargetStatus.Unknown, code: "Unknown" },
    ];
  }

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
          let ramCounter = 0;
          let notReadyCounter = 0;
          let readyCounter = 0;
          let runningCounter = 0;
          let stoppedCounter = 0;
          let failedCounter = 0;
          let unknownCounter = 0;
          targets.forEach((element) => {
            cpuCounter = cpuCounter + element.cpu;
            ramCounter = ramCounter + element.ram;
            element.isStartable === false ? notReadyCounter++ : null;
            element.isStartable === true ? readyCounter++ : null;
            element.status === "Running" ? runningCounter++ : null;
            element.status === "Stopped" ? stoppedCounter++ : null;
            element.status === "MigrationFailed" ? failedCounter++ : null;
            element.status === "Unknown" ? unknownCounter++ : null;
          });
          ramCounter = +this.fileSizePipe.transform(ramCounter, "", false);
          this.totalCpusRamPie = {
            labels: ["CPUs", "Ram (GB)"],
            datasets: [
              {
                data: [cpuCounter, ramCounter],
                backgroundColor: ["#42A5F5", "#9B59B6"],
                hoverBackgroundColor: ["#64B5F6", "#C39BD3"],
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
              this.targetStatus.MigrationFailed,
              this.targetStatus.Stopped,
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
                backgroundColor: ["green", "red", "orange", "#858585"],
                hoverBackgroundColor: [
                  "#00A800",
                  "#FF5252",
                  "#FFC65C",
                  "darkgrey",
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
        this.cpTargetAssets = targets;
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

  onSearch(): void {
    this.cpTargetAssets = this.targetAssets.filter((value) =>
      value.name.toUpperCase().includes(this.searchText.toLocaleUpperCase())
    );
  }

  onStatusChange(): void {
    if (this.selectedStatus.length === 0) {
      this.cpTargetAssets = this.targetAssets;
    } else {
      const statusArray: string[] = [];
      this.selectedStatus.forEach((element: multiSelect) => {
        statusArray.push(element.code);
      });
      this.cpTargetAssets = this.targetAssets.filter((value) => {
        return statusArray.includes(value.status);
      });
    }
  }
}
