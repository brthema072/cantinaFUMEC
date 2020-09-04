import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaticComponent } from './contatic.component';

describe('ContaticComponent', () => {
  let component: ContaticComponent;
  let fixture: ComponentFixture<ContaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContaticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
