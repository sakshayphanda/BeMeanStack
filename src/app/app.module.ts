
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { AdminModule } from './modules/admin/admin.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { StoreModule} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './store/reducers';
import { AuthEffects } from './store/effects/authenticaton/auth.effects';
import { UsersEffects } from './store/effects/users/users.effect';

const config = {
  apiKey: 'AIzaSyBAgpmHBxTqe8VHPwc3koB87T830vQ7boo',
  authDomain: 'bemeanstack.firebaseapp.com',
  databaseURL: 'https://bemeanstack.firebaseio.com',
  projectId: 'bemeanstack',
  storageBucket: '',
  messagingSenderId: '699849827638'
};
firebase.initializeApp(config);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AdminModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    EffectsModule.forRoot([AuthEffects, UsersEffects])
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
