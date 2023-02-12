import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "fileSize",
})
export class FileSizeTransformPipe implements PipeTransform {
  transform(bytes: number = 0, seperator: string = ""): string {
    const megaBytes = bytes / Math.pow(1024, 2);
    if (bytes === 0) return "n/a";
    return `${megaBytes}${seperator}MB`;
  }
}
