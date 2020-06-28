import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IUserInfo } from 'src/app/shared/models/interfaces/authenticate.interface';
import { AppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { UpdateUserApi } from 'src/app/store/actions/authentication/auth.actions';

interface IActions {
  name: string;
  route: string;
  count: number;
  params: any;
  icon: string;
}
@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavigationComponent implements OnInit, OnChanges {

  @Input('user') user: IUserInfo;
  actions: IActions[] = [];
  profilePic: File;
  imagePreview: string | ArrayBuffer;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.actions = this.getActions();

  }

  ngOnChanges() {
    this.actions = this.getActions();
  }

  getActions(): IActions[] {
    const actions = [
      {
        name: 'News Feed',
        route: 'feed',
        count: null,
        params: false,
        icon: 'insert_comment'
      },
      {
        name: 'Find users',
        route: 'users',
        count: null,
        params: {user: this.user._id},
        icon: 'group_add'
      },
      {
        name: 'Friends',
        route: 'friends',
        count: this.user.friends.length,
        params: false,
        icon: 'group'
      }
    ];

    return actions;
  }

  updateProfilePic() {
    const userData = new FormData();
    userData.append('_id', this.user._id);
    userData.append('picture', this.profilePic);
    this.store.dispatch(new UpdateUserApi(userData));
  }

  imageFile(event: Event) {
    this.profilePic = (event.target as HTMLInputElement).files[0];
    console.log(event);
    const reader = new FileReader();
    reader.onload = () => {
        this.imagePreview = reader.result;
        this.changeDetectorRef.markForCheck();
      };
    reader.readAsDataURL(this.profilePic);
  }

}
