import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ListAllUsersRequest } from 'src/app/store/actions/users/users.actions';
import { getAllUsers } from 'src/app/store/selectors/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListUsersComponent implements OnInit {
  users$: Observable<any>;
  constructor(
    private store: Store<any>) {}

  ngOnInit(): void {
    this.users$ = this.store.select(getAllUsers);
  }

  getAllUsers() {
    this.store.dispatch(new ListAllUsersRequest());
  }
}
