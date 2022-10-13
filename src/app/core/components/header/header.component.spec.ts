import { BehaviorSubject } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/models/user.model';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let fakeAuthService: Pick<AuthService, 'logout' | 'user'>;
  let testUser: User;

  beforeEach(async () => {
    testUser = new User(
      'TestUser',
      'testuser@gmail.com',
      'user123',
      'Bearer 1234qwerty'
    );
    fakeAuthService = {
      user: new BehaviorSubject<User | null>(testUser),
      logout: jasmine.createSpy('logout'),
    };

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: AuthService, useValue: fakeAuthService }],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show navigation on toggleNavigation function call', () => {
    component.onToggleNavigation();
    expect(component.showNavigation).toBeTrue();
  });

  it('logout calls from authService - true confirm', () => {
    spyOn(window, 'confirm').and.callFake(() => true);
    component.onLogout();
    expect(fakeAuthService.logout).toHaveBeenCalled();
  });

  it('logout not calls from authService - false confirm', () => {
    spyOn(window, 'confirm').and.callFake(() => false);
    component.onLogout();
    expect(fakeAuthService.logout).not.toHaveBeenCalled();
  });
});
