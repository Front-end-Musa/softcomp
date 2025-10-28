import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrestlerAccount } from './wrestler-account';

describe('WrestlerAccount', () => {
  let component: WrestlerAccount;
  let fixture: ComponentFixture<WrestlerAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WrestlerAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrestlerAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
