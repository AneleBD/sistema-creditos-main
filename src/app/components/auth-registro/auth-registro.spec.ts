import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegistroComponent } from './auth-registro';

describe('AuthRegistro', () => {
  let component: AuthRegistroComponent;
  let fixture: ComponentFixture<AuthRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthRegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthRegistroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
