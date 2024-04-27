import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarMateriasModalsComponent } from './eliminar-materias-modals.component';

describe('EliminarMateriasModalsComponent', () => {
  let component: EliminarMateriasModalsComponent;
  let fixture: ComponentFixture<EliminarMateriasModalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarMateriasModalsComponent]
    });
    fixture = TestBed.createComponent(EliminarMateriasModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
