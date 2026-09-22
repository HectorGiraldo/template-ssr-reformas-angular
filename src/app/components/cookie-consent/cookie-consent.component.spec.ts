import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CookieConsentComponent } from './cookie-consent.component';

describe('CookieConsentComponent', () => {
  let component: CookieConsentComponent;
  let fixture: ComponentFixture<CookieConsentComponent>;

  beforeEach(async () => {
    localStorage.removeItem('cookie-consent');
    await TestBed.configureTestingModule({
      imports: [CookieConsentComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CookieConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('cookie-consent');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the banner when no consent is stored', () => {
    expect(component.visible).toBeTrue();
  });

  it('hides the banner and stores the choice on accept', () => {
    component.accept();
    expect(component.visible).toBeFalse();
    expect(localStorage.getItem('cookie-consent')).toBe('accepted');
  });

  it('hides the banner and stores the choice on reject', () => {
    component.reject();
    expect(component.visible).toBeFalse();
    expect(localStorage.getItem('cookie-consent')).toBe('rejected');
  });
});
