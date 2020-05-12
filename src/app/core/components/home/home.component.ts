import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogoutRequest } from 'src/app/store/actions/authentication/auth.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnChanges {

  @Input('user') user;
  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
  }

  ngOnChanges(change) {
    console.log(change);

  }

  logOut() {
    this.store.dispatch(new LogoutRequest());
  }

}
