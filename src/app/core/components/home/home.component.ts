import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, ChangeDetectorRef } from '@angular/core';
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

  showMenuButton = false;
  showRightSideMenu;
  showSideMenu;
  @Input('user') user: IUserInfo;
  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if(window.innerWidth < 900) {
      this.showMenuButton = true;
      this.showSideMenu = false;
      this.showRightSideMenu = false;
    } else {
      this.showMenuButton = false;
      this.showSideMenu = true;
      this.showRightSideMenu = true;

    }

    window.addEventListener('resize', (ev) => {
      if (ev[`target`][`innerWidth`] < 900) {
        this.showMenuButton = true;
        this.showSideMenu = false;
        this.showRightSideMenu = false;
      } else {
        this.showMenuButton = false;
        this.showSideMenu = true;
        this.showRightSideMenu = true;
      }

      this.cdr.markForCheck();
    });
  }

}
