import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IUserInfo } from 'src/app/shared/models/interfaces/authenticate.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  @Input() user: IUserInfo;
  match: string = '(max-width: 900px)';
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(this.match)
    .pipe(
      map((result: BreakpointState) => result.matches),
      shareReplay() // to share the same response to different subscriptions
    );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
