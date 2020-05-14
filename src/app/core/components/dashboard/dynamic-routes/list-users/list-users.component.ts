import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ListAllUsersRequest, FriendRequest } from 'src/app/store/actions/users/users.actions';
import { getAllUsers } from 'src/app/store/selectors/auth.selector';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListUsersComponent implements OnInit {
  users$: Observable<any>;
  allUsersExceptCurrent = [];
  currentUserEmail: string;
  constructor(
    private store: Store<any>,
    private activatedRoute: ActivatedRoute,
    private changeDetection: ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.queryParams;
    this.currentUserEmail = params.user;
    this.store.select(getAllUsers).subscribe(
      users => {
        if (users) {
          this.allUsersExceptCurrent = users.filter(
            user => {
              if (user.email !== this.currentUserEmail) {
                return true;
              } else {
                return false;
              }
            }
          );
          this.changeDetection.markForCheck();
        }
      }
    );
    this.store.dispatch(new ListAllUsersRequest());
  }

  addasFriend(toEmail: string) {
    const obj = {
      to: toEmail,
      from: this.currentUserEmail
    };
    this.store.dispatch(new FriendRequest(obj));
  }
}
