import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { enableAnalytics } from '../../analytics';

const CONSENT_KEY = 'cookie-consent';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.css',
})
export class CookieConsentComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  visible = false;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.visible = !localStorage.getItem(CONSENT_KEY);
  }

  accept(): void {
    this.setConsent('accepted');
    if (isPlatformBrowser(this.platformId)) {
      enableAnalytics();
    }
  }

  reject(): void {
    this.setConsent('rejected');
  }

  private setConsent(value: 'accepted' | 'rejected'): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(CONSENT_KEY, value);
    }
    this.visible = false;
  }
}
