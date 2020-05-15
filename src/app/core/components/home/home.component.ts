import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogoutRequest } from 'src/app/store/actions/authentication/auth.actions';
import { IUserInfo } from 'src/app/shared/models/interfaces/authenticate.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  @Input('user') user: IUserInfo;
  constructor(
  ) { }

  ngOnInit() {
  }
}
