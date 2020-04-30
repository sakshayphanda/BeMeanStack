import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Store } from '@ngrx/store';
import { authSelector } from 'src/app/store/reducers';
import { IUserInfo } from 'src/app/shared/models/interfaces/authenticate.interface';
import { LogoutRequest } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  @Input('user') user;
  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<any>
  ) { }

  ngOnInit() {
  }

  logOut() {
    this.store.dispatch(new LogoutRequest());
  }

}
