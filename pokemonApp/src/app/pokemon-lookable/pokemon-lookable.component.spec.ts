import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonLookableComponent } from './pokemon-lookable.component';

describe('PokemonLookableComponent', () => {
  let component: PokemonLookableComponent;
  let fixture: ComponentFixture<PokemonLookableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonLookableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonLookableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
