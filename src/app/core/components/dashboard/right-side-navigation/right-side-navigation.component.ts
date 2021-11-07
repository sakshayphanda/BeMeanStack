import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { IUserInfo } from "src/app/shared/models/interfaces/authenticate.interface";
import { currentUser } from "src/app/store/selectors/auth.selector";
import { Store } from "@ngrx/store";
import { ActivatedRoute, Router } from "@angular/router";
import { AppState } from "src/app/store/reducers";

@Component({
  selector: "app-right-side-navigation",
  templateUrl: "./right-side-navigation.component.html",
  styleUrls: ["./right-side-navigation.component.sass"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightSideNavigationComponent implements OnInit {
  list = [];
  selectedType = "friends";
  currentUser: IUserInfo;
  types = [
    {
      id: "friends",
      label: "Friends",
    },
    {
      id: "friendRequests",
      label: "Friend Requests",
    },
  ];
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.select(currentUser).subscribe((user: IUserInfo) => {
      if (user) {
        this.currentUser = user;

        this.list = JSON.parse(JSON.stringify(this.currentUser["friends"]));
      }
    });
  }

  typeChanged(id) {
    this.selectedType = id;
    // this.router.navigate([id]);
    this.list = JSON.parse(JSON.stringify(this.currentUser[this.selectedType]));
  }

  unfriend(user) {
    // this.store.dispatch(new UnfriendApi({
    //   to: user[`_id`],
    //   from: this.currentUser[`_id`]
    // }));
    // const index = this.list.findIndex(element => element._id === user._id);
    // this.list.splice(index, 1);
  }
}
