import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import {  ListAllUsersApi, FriendRequestApi } from 'src/app/store/actions/users/users.actions';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UpdateUser } from 'src/app/store/actions/authentication/auth.actions';
import { AppState } from 'src/app/store/reducers';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { getAllUsers, friendRequestSuccess } from 'src/app/store/selectors/user.selector';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListUsersComponent implements OnInit {
  users$: Observable<any>;
  allUsersExceptCurrent = [];
  currentUserID: string;
  currentUser;
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private changeDetection: ChangeDetectorRef,
    private authService: AuthenticationService
    ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.queryParams;
    this.currentUserID = params.user;
    this.currentUser = this.authService.userDetails;
    this.store.select(getAllUsers).subscribe(
      users => {
        if (users) {
          this.allUsersExceptCurrent = users.filter(user => user._id !== this.currentUserID);
          this.allUsersExceptCurrent = this.allUsersExceptCurrent.map(
            user => {
              const newObj = Object.assign({}, user);
              const alreadyAdded = this.currentUser.friends.some( u => u._id === user._id);
              if (alreadyAdded) {
                Object.defineProperty(newObj, 'alreadyAdded', {
                  value: true
                });
                return newObj;
              } else {
                Object.defineProperty(newObj, 'alreadyAdded', {
                  value: false
                });
                return newObj;
              }
            }
          );
          this.changeDetection.markForCheck();
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
    this.store.dispatch(new ListAllUsersApi());
  }

  addasFriend(user: string) {
    this.store.dispatch(new FriendRequestApi({
      to: user[`_id`],
      from: this.currentUser[`_id`]
    }));
  }

  checkIfSent(user) {
    let pending = false;
    this.currentUser.friendRequestsPending.forEach(
      item => {
        if (item._id === user._id) {
          pending = true;
        }
      }
    );

    return pending;
  }

    checkIfReceived(user) {
    let received = false;
    console.log(this.currentUser);

    this.currentUser.friendRequests.forEach(
      item => {
        if (item._id === user._id) {
          received = true;
        }
      }
    );

    return received;
  }
}
