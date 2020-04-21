import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  message: string;
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  authenticate(loginDetails) {
    this.authenticationService.athenticate(loginDetails.value);
  }

}
