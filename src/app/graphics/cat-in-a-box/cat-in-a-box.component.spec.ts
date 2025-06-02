import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatInABoxComponent } from './cat-in-a-box.component';

describe('CatInABoxComponent', () => {
  let component: CatInABoxComponent;
  let fixture: ComponentFixture<CatInABoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatInABoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatInABoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
