import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  message: string;
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {}

  authenticate(userDetails) {
    this.authenticationService
      .athenticate(userDetails.value)
      .pipe(
        catchError((error) => {
          console.log(error);
          this.message = error.error.message;
          return throwError(error);
        })
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  signIn(userDetails) {
    this.authenticationService
      .register(userDetails.value)
      .pipe(
        catchError((error) => {
          console.log(error);
          this.message = error.error.message;
          return throwError(error);
        })
      )
      .subscribe((response) => {
        this.message = response.message;
        console.log(response);
      });
  }
}
