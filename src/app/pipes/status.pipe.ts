import { Pipe, PipeTransform } from "@angular/core";
import { TargetStatus } from "../shared/enums";

@Pipe({
  name: "status",
})
export class StatusPipe implements PipeTransform {
  transform(value: string): string {
    const targetStatus = TargetStatus;
    return targetStatus[value as keyof typeof TargetStatus];
  }
}
