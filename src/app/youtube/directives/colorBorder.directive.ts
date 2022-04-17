import { Directive, HostBinding, Input } from '@angular/core';
import { CONSTANTS } from '../../shared/models/constants';

@Directive({
  selector: '[appColorBorder]',
})
export class ColorBorderDirective {
  @Input() public publishedDate: string = '';
  private borderBottom: string = '#ed2f2f';

  @HostBinding('style.borderBottomColor') public get getBorderBottomColor(): string {
    const period: number = this.getTimePeriod();
    if (period < CONSTANTS.ONE_WEEK) {
      this.borderBottom = CONSTANTS.BLUE_BORDER;
    } else if (period > CONSTANTS.ONE_WEEK && period < CONSTANTS.ONE_MOUNTH) {
      this.borderBottom = CONSTANTS.GREEN_BORDER;
    } else {
      this.borderBottom = CONSTANTS.RED_BORDER;
    }
    return this.borderBottom;
  }

  private getTimePeriod(): number {
    const now: number = Date.now();
    const publishedAt: number = Date.parse(this.publishedDate);
    return now - publishedAt;
  }
}
