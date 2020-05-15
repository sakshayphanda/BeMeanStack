import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { currentUser } from 'src/app/store/selectors/auth.selector';
import { IAuthInfo, IUserInfo } from 'src/app/shared/models/interfaces/authenticate.interface';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendsComponent implements OnInit {

  currentUser: IUserInfo;
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.store.select(currentUser).subscribe(
      (user: IUserInfo) => {
        console.log(user);
        if (user) {
          this.currentUser = user;
        }
      }
    );
  }

}
