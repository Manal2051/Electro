import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations'

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes ,withViewTransitions() ),
     provideClientHydration(withEventReplay()),
    provideHttpClient(),
    importProvidersFrom(BrowserAnimationsModule),
    


  ]
};
