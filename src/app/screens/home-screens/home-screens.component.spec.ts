import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeScreensComponent } from './home-screens.component';

describe('HomeScreensComponent', () => {
  let component: HomeScreensComponent;
  let fixture: ComponentFixture<HomeScreensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeScreensComponent]
    });
    fixture = TestBed.createComponent(HomeScreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
