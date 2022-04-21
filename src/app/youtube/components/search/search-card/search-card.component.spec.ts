import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchCardComponent } from './search-card.component';

@Component({
  template: `<app-search-card [item]="customCard" [search]="search"></app-search-card>`,
})
class TestHostComponent {
  public customCard = {
    id: '1',
    title: 'title',
    description: 'description',
    image: 'image',
    video: 'video',
    date: 'date',
  };
  public search = 'customCard';
}

describe('SearchCardComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SearchCardComponent, TestHostComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain title', () => {
    const title = <HTMLParagraphElement>fixture.debugElement.query(By.css('p')).nativeElement;
    expect(title.textContent).toBe(component.customCard.title);
  });

  it('should contain image', () => {
    const img = <HTMLImageElement>fixture.debugElement.query(By.css('img')).nativeElement;
    expect(img.src).toContain(component.customCard.image);
  });

  it('should contain link with id and query params', () => {
    const link = <HTMLAnchorElement>(
      fixture.debugElement.query(By.css('a')).nativeElement.getAttribute('href')
    );
    expect(link).toContain(component.customCard.id);
    expect(link).toContain(component.search);
  });
});
