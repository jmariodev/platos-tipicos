import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveModifyPlato } from './save-modify-plato';

describe('SaveModifyPlato', () => {
  let component: SaveModifyPlato;
  let fixture: ComponentFixture<SaveModifyPlato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveModifyPlato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveModifyPlato);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
