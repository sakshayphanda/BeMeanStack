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
    const params = this.activatedRoute.snapshot.queryParams;
    this.store.select(currentUser).subscribe(
      (user: IUserInfo) => {
        if (user) {
          this.currentUser = user;
        }
      }
    );
  }

  typeChanged(id) {
    this.selectedType = id;
    this.list = this.currentUser[this.selectedType];
  }

}
