import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { ProgressService } from 'src/app/core/services/progress.service';
import { FilterByWordPipe } from '../../pipes/filterByWord.pipe';
import { SortByFieldPipe } from '../../pipes/sortByField.pipe';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let pipeSpyWord: jasmine.Spy;
  let pipeSpyField: jasmine.Spy;
  let progressServiceMock: ProgressService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [SearchComponent, FilterByWordPipe, SortByFieldPipe],
      providers: [ProgressService, provideMockStore()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    pipeSpyWord = spyOn(FilterByWordPipe.prototype, 'transform');
    pipeSpyField = spyOn(SortByFieldPipe.prototype, 'transform');
    progressServiceMock = TestBed.inject(ProgressService);
  });

  afterEach(() => {
    TestBed.inject(MockStore)?.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filterByWord should call FilterByWordPipe pipe', () => {
    component.filterByWord('word');
    expect(pipeSpyWord).toHaveBeenCalled();
  });

  it('filterByField should call SortByFieldPipe pipe', () => {
    component.filterByField(true, 'date');
    expect(pipeSpyField).toHaveBeenCalled();
  });

  it('should be loading when true', () => {
    progressServiceMock.dataLoading$ = of(true);
    component.ngOnInit();
    expect(component.isLoading).toBeTrue();
  });
});
