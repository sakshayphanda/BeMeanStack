import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-right-side-navigation',
  templateUrl: './right-side-navigation.component.html',
  styleUrls: ['./right-side-navigation.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightSideNavigationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
