import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSideNavigationComponent } from './right-side-navigation.component';

describe('RightSideNavigationComponent', () => {
  let component: RightSideNavigationComponent;
  let fixture: ComponentFixture<RightSideNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightSideNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightSideNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
