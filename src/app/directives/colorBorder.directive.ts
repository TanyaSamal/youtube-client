import { Directive, HostBinding, Input } from '@angular/core';
import { Constants } from '../models/constants';

@Directive({
  selector: '[appColorBorder]',
})
export class ColorBorderDirective {
  private borderBottom: string = '#ed2f2f';

  @Input() public publishedDate: string = '';

  private getTimePeriod(): number {
    const now: number = Date.now();
    const publishedAt: number = Date.parse(this.publishedDate);
    return now - publishedAt;
  }

  @HostBinding('style.borderBottomColor') public get getBorderBottomColor(): string {
    const period: number = this.getTimePeriod();
    if (period < Constants.ONE_WEEK) {
      this.borderBottom = Constants.BLUE_BORDER;
    } else if (period > Constants.ONE_WEEK && period < Constants.ONE_MOUNTH) {
      this.borderBottom = Constants.GREEN_BORDER;
    } else {
      this.borderBottom = Constants.RED_BORDER;
    }
    return this.borderBottom;
  }
}
