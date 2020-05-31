import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { currentUser } from 'src/app/store/selectors/auth.selector';
import { IUserInfo } from 'src/app/shared/models/interfaces/authenticate.interface';
import { FriendRequestAcceptApi, FriendRequestRejectApi, UnfriendApi } from 'src/app/store/actions/users/users.actions';
import { UpdateUser } from 'src/app/store/actions/authentication/auth.actions';
import { friendRequestSuccess } from 'src/app/store/selectors/user.selector';

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
  }];
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const path = this.activatedRoute.snapshot.routeConfig.path;
    this.selectedType = path;
    this.store.select(currentUser).subscribe(
      (user: IUserInfo) => {
        if (user) {
          this.currentUser = user;
          this.list = JSON.parse(JSON.stringify(this.currentUser[this.selectedType]));
        }
      }
    );

    this.store.select(friendRequestSuccess).subscribe(
      user => {
        if (user && Object.keys(user).length) {
          this.store.dispatch(new UpdateUser(user));
        }
      }
    );
  }

  typeChanged(id) {
    this.selectedType = id;
    // this.router.navigate([id]);
    this.list = JSON.parse(JSON.stringify(this.currentUser[this.selectedType]));
  }

  friendReqAccept(user) {
    this.store.dispatch(new FriendRequestAcceptApi({
      to: user[`_id`],
      from: this.currentUser[`_id`]
    }));
    const index = this.list.findIndex(element => element._id === user._id);
    this.list.splice(index, 1);
  }

  friendReqReject(user) {
    this.store.dispatch(new FriendRequestRejectApi({
      to: user[`_id`],
      from: this.currentUser[`_id`]
    }));
    const index = this.list.findIndex(element => element._id === user._id);
    this.list.splice(index, 1);
  }

  unfriend(user) {
    this.store.dispatch(new UnfriendApi({
      to: user[`_id`],
      from: this.currentUser[`_id`]
    }));
    const index = this.list.findIndex(element => element._id === user._id);
    this.list.splice(index, 1);
  }

}
