import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestManagmentComponent } from './guest-managment.component';

describe('GuestManagmentComponent', () => {
  let component: GuestManagmentComponent;
  let fixture: ComponentFixture<GuestManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestManagmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuestManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
