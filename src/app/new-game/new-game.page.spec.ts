import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewGamePage } from './new-game.page';

describe('NewGamePage', () => {
  let component: NewGamePage;
  let fixture: ComponentFixture<NewGamePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [NewGamePage],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
