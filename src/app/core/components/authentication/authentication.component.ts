import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { authSelector } from 'src/app/store/selectors/auth.selector';
import { DefaultAuth } from 'src/app/store/actions';
import { IAuthInfo } from 'src/app/shared/models/interfaces/authenticate.interface';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.sass']
})
export class AuthenticationComponent implements OnInit {

  isLoggedIn = false;
  user: IAuthInfo;
  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
    if (localStorage.getItem('email') && localStorage.getItem('token')) {
      this.store.dispatch(new DefaultAuth.CheckLoggedIn());
    }
    this.store.select(authSelector).subscribe(
      (userDetails: IAuthInfo) => {
        if (userDetails) {
          console.log(userDetails);
          this.user = {...userDetails};
          this.isLoggedIn = userDetails.loggedIn;
        }
      }
    );
  }


}
