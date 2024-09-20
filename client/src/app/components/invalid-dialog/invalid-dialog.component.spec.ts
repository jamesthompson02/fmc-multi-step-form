import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidDialogComponent } from './invalid-dialog.component';

describe('InvalidDialogComponent', () => {
  let component: InvalidDialogComponent;
  let fixture: ComponentFixture<InvalidDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvalidDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvalidDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
