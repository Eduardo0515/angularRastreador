import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarUbicacionMapaComponent } from './visualizar-ubicacion-mapa.component';

describe('VisualizarUbicacionMapaComponent', () => {
  let component: VisualizarUbicacionMapaComponent;
  let fixture: ComponentFixture<VisualizarUbicacionMapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarUbicacionMapaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarUbicacionMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
