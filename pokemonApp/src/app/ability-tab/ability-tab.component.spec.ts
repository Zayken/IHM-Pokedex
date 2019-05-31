import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityTabComponent } from './ability-tab.component';

describe('AbilityTabComponent', () => {
  let component: AbilityTabComponent;
  let fixture: ComponentFixture<AbilityTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbilityTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbilityTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
