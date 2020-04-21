import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.sass']
})
export class AuthenticationComponent implements OnInit {

  isLoggedIn = false;
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.isLoggedIn;

  }

}
