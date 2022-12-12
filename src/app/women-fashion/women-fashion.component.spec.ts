import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenFashionComponent } from './women-fashion.component';

describe('WomenFashionComponent', () => {
  let component: WomenFashionComponent;
  let fixture: ComponentFixture<WomenFashionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WomenFashionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenFashionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
