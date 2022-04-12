import { Directive, HostBinding, Input } from '@angular/core';
import { CONSTANTS } from '../models/constants';

@Directive({
  selector: '[appColorBorder]',
})
export class ColorBorderDirective {
  @Input() public publishedDate: string = '';
  private borderBottom: string = '#ed2f2f';

  @HostBinding('style.borderBottomColor') public get getBorderBottomColor(): string {
    const period: number = this.getTimePeriod();
    if (period < CONSTANTS.ONE_WEEK_IN_SECONDS) {
      this.borderBottom = CONSTANTS.BLUE_BORDER_COLOR;
    } else if (period > CONSTANTS.ONE_WEEK_IN_SECONDS && period < CONSTANTS.ONE_MOUNTH_IN_SECONDS) {
      this.borderBottom = CONSTANTS.GREEN_BORDER_COLOR;
    } else {
      this.borderBottom = CONSTANTS.RED_BORDER_COLOR;
    }
    return this.borderBottom;
  }

  private getTimePeriod(): number {
    const now: number = Date.now();
    const publishedAt: number = Date.parse(this.publishedDate);
    return now - publishedAt;
  }
}
