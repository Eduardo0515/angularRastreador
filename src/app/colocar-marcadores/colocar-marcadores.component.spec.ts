import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColocarMarcadoresComponent } from './colocar-marcadores.component';

describe('ColocarMarcadoresComponent', () => {
  let component: ColocarMarcadoresComponent;
  let fixture: ComponentFixture<ColocarMarcadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColocarMarcadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColocarMarcadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
