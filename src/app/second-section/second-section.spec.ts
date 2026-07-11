import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondSection } from './second-section';

describe('SecondSection', () => {
  let component: SecondSection;
  let fixture: ComponentFixture<SecondSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondSection],
    }).compileComponents();

    fixture = TestBed.createComponent(SecondSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
