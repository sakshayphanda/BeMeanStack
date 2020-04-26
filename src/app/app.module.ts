import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { AdminModule } from './modules/admin/admin.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

const config = {
  apiKey: "AIzaSyBAgpmHBxTqe8VHPwc3koB87T830vQ7boo",
  authDomain: "bemeanstack.firebaseapp.com",
  databaseURL: "https://bemeanstack.firebaseio.com",
  projectId: "bemeanstack",
  storageBucket: "",
  messagingSenderId: "699849827638"
};
firebase.initializeApp(config);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AdminModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
