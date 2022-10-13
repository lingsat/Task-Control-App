import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ArchiveComponent } from './archive.component';
import { UserDataService } from '../../services/user-data.service';
import { of } from 'rxjs';

describe('ArchiveComponent', () => {
  let component: ArchiveComponent;
  let fixture: ComponentFixture<ArchiveComponent>;
  let fakeUserDataService: Pick<
    UserDataService,
    'getBoardsObs' | 'clearArchive'
  >;

  beforeEach(async () => {
    fakeUserDataService = {
      getBoardsObs: jasmine.createSpy('getBoardsObs').and.returnValue(of([])),
      clearArchive: jasmine.createSpy('clearArchive'),
    };

    await TestBed.configureTestingModule({
      declarations: [ArchiveComponent],
      providers: [{ prvide: UserDataService, useValue: fakeUserDataService }],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide delete button', () => {
    expect(component.showDelBtn).toBeFalse();
  });

  it('should create onClearArchive', () => {
    expect(component.onClearArchive).toBeTruthy();
  });

  // not correct
  it('clear archive not calls from UserDataService - false confirm', () => {
    spyOn(window, 'confirm').and.callFake(() => false);
    component.onClearArchive();
    expect(fakeUserDataService.clearArchive).not.toHaveBeenCalled();
  });
});
