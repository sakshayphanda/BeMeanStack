
import { NgModule } from '@angular/core';
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
import { PostsEffects } from './store/effects/posts/posts.effect';
import { DragComponent } from './shared/schemantics/drag/drag.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TreeComponent } from './shared/schemantics/tree/tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DashComponent } from './shared/schemantics/dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { TableComponent } from './shared/schemantics/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AddressFormComponent } from './shared/schemantics/address-form/address-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';


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
    AppComponent,
    DragComponent,
    TreeComponent,
    DashComponent,
    TableComponent,
    AddressFormComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    AdminModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    EffectsModule.forRoot([AuthEffects, UsersEffects, PostsEffects]),
    DragDropModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
