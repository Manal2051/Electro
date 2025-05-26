import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import{BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations'
import { errorsInterceptor } from './interceptors/errors.interceptor';
import{provideToastr}from 'ngx-toastr';
import {NgxSpinnerModule} from 'ngx-spinner';
import { loadingInterceptor } from './interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes ,withViewTransitions() ),
     provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([errorsInterceptor , loadingInterceptor])),
    importProvidersFrom(BrowserAnimationsModule),
     provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers

    importProvidersFrom(NgxSpinnerModule)
  ]
};

