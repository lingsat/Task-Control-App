import { BehaviorSubject } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/models/user.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let fakeAuthService: Pick<AuthService, 'logout' | 'user'>;
  let debugElement: DebugElement;
  let testUser: User = new User(
    'TestUser',
    'testuser@gmail.com',
    'user123',
    'Bearer 1234qwerty'
  );

  beforeEach(async () => {
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
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show navigation on toggleNavigation function call', () => {
    debugElement
      .query(By.css('.header__burger'))
      .triggerEventHandler('click', null);
    expect(component.showNavigation).toBeTrue();
  });

  it('logout calls from authService - true confirm', () => {
    spyOn(window, 'confirm').and.callFake(() => true);
    debugElement
      .query(By.css('.header__btn'))
      .triggerEventHandler('click', null);
    expect(fakeAuthService.logout).toHaveBeenCalled();
  });

  it('logout not calls from authService - false confirm', () => {
    spyOn(window, 'confirm').and.callFake(() => false);
    debugElement
      .query(By.css('.header__btn'))
      .triggerEventHandler('click', null);
    expect(fakeAuthService.logout).not.toHaveBeenCalled();
  });
});
