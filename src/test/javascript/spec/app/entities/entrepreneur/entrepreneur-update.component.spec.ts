import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { LacusticoTestModule } from '../../../test.module';
import { EntrepreneurUpdateComponent } from 'app/entities/entrepreneur/entrepreneur-update.component';
import { EntrepreneurService } from 'app/entities/entrepreneur/entrepreneur.service';
import { Entrepreneur } from 'app/shared/model/entrepreneur.model';

describe('Component Tests', () => {
  describe('Entrepreneur Management Update Component', () => {
    let comp: EntrepreneurUpdateComponent;
    let fixture: ComponentFixture<EntrepreneurUpdateComponent>;
    let service: EntrepreneurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LacusticoTestModule],
        declarations: [EntrepreneurUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(EntrepreneurUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EntrepreneurUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EntrepreneurService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Entrepreneur(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Entrepreneur();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
