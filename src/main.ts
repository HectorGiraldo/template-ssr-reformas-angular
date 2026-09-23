import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableAnalyticsIfConsented } from './app/analytics';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// Only runs Vercel Web Analytics if this visitor already accepted the
// cookie banner on a previous visit; see CookieConsentComponent for the
// current-session path.
enableAnalyticsIfConsented();
