import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartIemStoreComponent } from './cart-iem-store.component';

describe('CartIemStoreComponent', () => {
  let component: CartIemStoreComponent;
  let fixture: ComponentFixture<CartIemStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartIemStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartIemStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
