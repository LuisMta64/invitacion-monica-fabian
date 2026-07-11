import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recuerdos } from './recuerdos';

describe('Recuerdos', () => {
  let component: Recuerdos;
  let fixture: ComponentFixture<Recuerdos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recuerdos],
    }).compileComponents();

    fixture = TestBed.createComponent(Recuerdos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
