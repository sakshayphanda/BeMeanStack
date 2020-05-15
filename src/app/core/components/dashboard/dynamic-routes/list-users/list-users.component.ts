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
          this.allUsersExceptCurrent = users.filter(user => user._id !== this.currentUserID);
          this.changeDetection.markForCheck();
        }
      }
    );

    this.store.select(friendRequest).subscribe(
      FR => {
        if (FR && Object.keys(FR).length) {
          console.log(FR);

        //  this.store.dispatch(new UpdateUser(FR.updatedUser));
        }
      }
    );
    this.store.dispatch(new ListAllUsersRequest());
  }

  addasFriend(toEmail: string) {
    const obj = {
      to: toEmail,
      from: this.currentUserID
    };
    this.store.dispatch(new FriendRequest(obj));
  }
}
