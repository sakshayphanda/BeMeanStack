import { Injectable } from '@angular/core';
import { IAuthenticate } from '../models/interfaces/authenticate.interface';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { Authenticate } from '../models/enums/authentication.enum';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  isLoggedIn = false;
  constructor(
    private httpService: HttpService
  ) { }

  athenticate(loginDetails: IAuthenticate): Observable<any> {
    return this.httpService.httpPost(environment.baseApiUrl + Authenticate.LOG_IN, loginDetails);
  }

  register(signinDetails: IAuthenticate): Observable<any> {
    return this.httpService.httpPost(environment.baseApiUrl + Authenticate.SIGN_IN, signinDetails);
  }
}
