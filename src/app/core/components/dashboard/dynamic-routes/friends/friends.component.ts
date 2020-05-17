import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { currentUser, friendRequest } from 'src/app/store/selectors/auth.selector';
import { IAuthInfo, IUserInfo } from 'src/app/shared/models/interfaces/authenticate.interface';
import { FriendRequestAcceptApi } from 'src/app/store/actions/users/users.actions';
import { UpdateUser } from 'src/app/store/actions/authentication/auth.actions';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriendsComponent implements OnInit {
  list = [];
  selectedType = 'friends';
  currentUser: IUserInfo;
  types = [{
    id: 'friends',
    label: 'Friends'
  }, {
    id: 'friendRequests',
    label: 'Friend Requests'
  },
  {
    id: 'friendRequestsPending',
    label: 'Pending'
  }];
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const path = this.activatedRoute.snapshot.routeConfig.path;
    this.selectedType = path;
    this.store.select(currentUser).subscribe(
      (user: IUserInfo) => {
        if (user) {
          this.currentUser = user;
          this.typeChanged(path);
        }
      }
    );

    this.store.select(friendRequest).subscribe(
      user => {
        if (user && Object.keys(user).length) {
          this.store.dispatch(new UpdateUser(user));
        }
      }
    );
  }

  typeChanged(id) {
    this.selectedType = id;
    this.list = this.currentUser[this.selectedType];
  }

  friendReqAccept(user) {
    this.store.dispatch(new FriendRequestAcceptApi({
      to: user,
      from: this.currentUser
    }));
    const index = this.list.findIndex(element => element._id === user._id);
    this.list.splice(index, 1);
  }

}
