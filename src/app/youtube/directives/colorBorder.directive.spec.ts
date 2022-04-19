import { Component, DebugElement } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColorBorderDirective } from './colorBorder.directive';

@Component({
  template: `<div appColorBorder publishedDate="2022-04-19T16:53:41.000Z">ONE_WEEK</div>
    <div appColorBorder publishedDate="2022-04-09T16:53:41.000Z">ONE_MONTH</div>
    <div appColorBorder publishedDate="2021-09-16T16:53:41.000Z">Later than 1 month</div>
    <div appColorBorder>default</div>
    <div>Without directive</div>`,
})
class TestComponent {}

describe('ColorBorderDirective', () => {
  let divs: DebugElement[];
  let bareDiv: DebugElement;

  beforeEach(() => {
    const fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, ColorBorderDirective],
    }).createComponent(TestComponent);
    fixture.detectChanges();
    divs = fixture.debugElement.queryAll(By.directive(ColorBorderDirective));
    bareDiv = fixture.debugElement.query(By.css('div:not([appColorBorder])'));
  });

  it('should create an instance', () => {
    const directive = new ColorBorderDirective();
    expect(directive).toBeTruthy();
  });

  it('should have 4 elements with color border', () => {
    expect(divs.length).toBe(4);
  });

  it('should color 1st <div> border "rgb(47, 128, 237)"', () => {
    const bgColor = divs[0].nativeElement.style.borderBottomColor;
    expect(bgColor).toBe('rgb(47, 128, 237)');
  });

  it('should color 2st <div> border "rgb(25, 214, 110)"', () => {
    const bgColor = divs[1].nativeElement.style.borderBottomColor;
    expect(bgColor).toBe('rgb(25, 214, 110)');
  });

  it('should color 3st <div> border "rgb(237, 47, 47)"', () => {
    const bgColor = divs[2].nativeElement.style.borderBottomColor;
    expect(bgColor).toBe('rgb(237, 47, 47)');
  });

  it('should color 4st <div> border default color', () => {
    const bgColor = divs[3].nativeElement.style.borderBottomColor;
    expect(bgColor).toBe('rgb(237, 47, 47)');
  });

  it('bare <div> should not have a appColorBorder', () => {
    expect(bareDiv.properties['appColorBorder']).toBeUndefined();
  });
});
