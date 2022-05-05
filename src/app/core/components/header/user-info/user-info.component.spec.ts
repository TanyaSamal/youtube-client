import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserInfoComponent } from './user-info.component';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;
  let authServiceMock: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [UserInfoComponent],
      providers: [AuthService],
    }).compileComponents();
    authServiceMock = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have logged in after construction', () => {
    expect(component.isLoggedIn).toBeFalse();
  });

  it('should have user info after ngOnInit if user is logged in', () => {
    authServiceMock.data$ = of({
      isAuth: true,
      userName: 'Tanya',
    });
    component.ngOnInit();
    expect(component.isLoggedIn).toBeTrue();
    expect(component.username).toBe('Tanya');
  });

  it("shouldn't have user info after ngOnInit if user isn't logged in", () => {
    component.ngOnInit();
    expect(component.isLoggedIn).toBeFalse();
    expect(component.username).toBe('Your name');
  });

  it('onLogout shouldn navigate on login page', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onLogout();
    expect(component.isLoggedIn).toBeFalse();
    expect(component.username).toBe('');
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
