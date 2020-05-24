import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ListAllUsersRequest, FriendRequest } from 'src/app/store/actions/users/users.actions';
import { getAllUsers, friendRequest } from 'src/app/store/selectors/auth.selector';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UpdateUser } from 'src/app/store/actions/authentication/auth.actions';
import { AppState } from 'src/app/store/reducers';

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
    private changeDetection: ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.queryParams;
    this.currentUserID = params.user;
    this.store.select(getAllUsers).subscribe(
      users => {
        if (users) {
          this.allUsersExceptCurrent = users.filter(user => {
            if (user._id !== this.currentUserID) {
              return true;
            } else {
              this.currentUser = user;
              return false;
            }
          });
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
          console.log(this.allUsersExceptCurrent);

          this.changeDetection.markForCheck();
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
    this.store.dispatch(new ListAllUsersRequest());
  }

  addasFriend(user: string) {
    this.store.dispatch(new FriendRequest({
      to: user[`_id`],
      from: this.currentUser[`_id`]
    }));
  }


}
