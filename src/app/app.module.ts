import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AppRouterModule } from './app.router.module';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { AuthEffects } from './store/effects/authenticaton/auth.effects';
import { GoogleAuthEffects } from './store/effects/authenticaton/google-auth.effects';
import { PostsEffects } from './store/effects/posts/posts.effect';
import { UsersEffects } from './store/effects/users/users.effect';
import { metaReducers, reducers } from './store/reducers';

const firebaseConfig = {
  apiKey: 'AIzaSyBAgpmHBxTqe8VHPwc3koB87T830vQ7boo',
  authDomain: 'bemeanstack.firebaseapp.com',
  databaseURL: 'https://bemeanstack.firebaseio.com',
  projectId: 'bemeanstack',
  storageBucket: 'bemeanstack.appspot.com',
  messagingSenderId: '699849827638',
  appId: '1:699849827638:web:bf8ab82a3e3539a8adbf97',
  measurementId: 'G-6HQ56MQEF7',
};
firebase.initializeApp(firebaseConfig);

/**
 * runs on app boot
 */
export function applicationBoot(): Promise<boolean> {
  // add app logic to be run before the app loads
  return new Promise((resolve: () => void, reject: () => void): void => {
    setTimeout(() => {
      resolve();
    }, 0);
  });
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRouterModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    EffectsModule.forRoot([
      AuthEffects,
      GoogleAuthEffects,
      UsersEffects,
      PostsEffects,
    ]),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (): (() => void) => applicationBoot,
      multi: true,
      deps: [],
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
