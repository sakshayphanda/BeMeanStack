import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Store } from '@ngrx/store';
import { CheckLoggedIn } from 'src/app/store/actions/auth.actions';
import { authSelector } from 'src/app/store/reducers';
import { IUserInfo } from 'src/app/shared/models/interfaces/authenticate.interface';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.sass']
})
export class AuthenticationComponent implements OnInit {

  isLoggedIn = false;
  user = {};
  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.store.dispatch(new CheckLoggedIn());
    this.store.select(authSelector).subscribe(
      (userDetails: any) => {
        console.log(userDetails);
        if(userDetails) {
        this.user = userDetails;
        this.isLoggedIn = userDetails.loggedIn;
        }
      }
    );
  }


}
