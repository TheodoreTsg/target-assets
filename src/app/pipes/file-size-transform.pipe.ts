import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
})
export class FileSizeTransformPipe implements PipeTransform {
  transform(
    bytes: number = 0,
    seperator: string = '',
    MB: boolean = true
  ): string {
    if (bytes === 0) return 'n/a';
    const megaBytes = bytes / Math.pow(1024, 2);
    const i: number = parseInt(
      Math.floor(Math.log(bytes) / Math.log(1024)).toString()
    );
    return MB
      ? `${megaBytes}${seperator}`
      : `${(bytes / Math.pow(1024, i)).toFixed(1)}`;
  }
}
