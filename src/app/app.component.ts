import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducers';
import { loadingState } from './store/selectors/auth.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'bemeanstack';
  loading: boolean;
  constructor(
  ) {
  }

  ngOnInit() {
    // this.store.select(loadingState).subscribe(
    //   loading => {
    //     this.loading = loading;
    //   }
    // );
  }
}
