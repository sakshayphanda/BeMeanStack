import { Injectable } from '@angular/core';
import { ILogin } from '../models/interfaces/login.interface';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  isLoggedIn = false;
  constructor(
    private httpService: HttpService
  ) { }

  athenticate(loginDetails: ILogin) {
    console.log(loginDetails);
    this.httpService.httpPost(environment.baseApiUrl + '/signin', loginDetails).subscribe(
      response => {
        console.log(response);

      }
    );
  }

}
