import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { StateService } from 'src/app/core/services/state.service';
import { FilterComponent } from './filter.component';

@Component({
  template: `<app-filter
    (filterByField)="filterByField($event)"
    (filterByWord)="filterByWord($event)"
  ></app-filter>`,
})
class TestHostComponent {
  public eventValue = {
    direction: true,
    field: 'date',
  };
  public wordValue = 'word';
  public event: { direction: boolean; field: string } = Object.assign({});
  public word = '';
  public filterByField(event: { direction: boolean; field: string }) {
    this.event = event;
  }
  public filterByWord(inputWord: string) {
    this.word = inputWord;
  }
}

describe('FilterComponent', () => {
  let testComponent: TestHostComponent;
  let testFixture: ComponentFixture<TestHostComponent>;
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let stateServiceMock: StateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterComponent, TestHostComponent],
      providers: [StateService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    testFixture = TestBed.createComponent(TestHostComponent);
    testComponent = testFixture.componentInstance;
    testFixture.detectChanges();
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    stateServiceMock = TestBed.inject(StateService);
  });

  it('should create testHostComponent', () => {
    expect(testComponent).toBeTruthy();
  });

  it('should create filterComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filter by word', () => {
    const input = testFixture.debugElement.query(By.css('input'));
    input.triggerEventHandler('keyup', { target: { value: 'word' } });
    expect(testComponent.word).toEqual(testComponent.wordValue);
  });

  it('should emit filter by field', () => {
    const button = testFixture.debugElement.query(By.css('.sort'));
    button.triggerEventHandler('click', {
      direction: true,
      field: 'date',
    });
    expect(testComponent.event).toEqual(testComponent.eventValue);
  });

  it('should open filter on true', () => {
    stateServiceMock.data$ = of(true);
    component.ngOnInit();
    expect(component.isOpen).toBeTrue();
  });
});
