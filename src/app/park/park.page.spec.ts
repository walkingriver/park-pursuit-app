import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ParkPage } from './park.page';

describe('ParkPage', () => {
  let component: ParkPage;
  let fixture: ComponentFixture<ParkPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ParkPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
