import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatButtonModule
  ],
  providers: [
    AuthenticationService
  ]
})
export class SharedModule { }
