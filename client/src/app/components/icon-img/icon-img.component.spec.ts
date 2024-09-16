import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconImgComponent } from './icon-img.component';

describe('IconImgComponent', () => {
  let component: IconImgComponent;
  let fixture: ComponentFixture<IconImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
