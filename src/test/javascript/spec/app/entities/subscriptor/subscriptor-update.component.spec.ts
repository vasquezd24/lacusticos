import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { LacusticoTestModule } from '../../../test.module';
import { SubscriptorUpdateComponent } from 'app/entities/subscriptor/subscriptor-update.component';
import { SubscriptorService } from 'app/entities/subscriptor/subscriptor.service';
import { Subscriptor } from 'app/shared/model/subscriptor.model';

describe('Component Tests', () => {
  describe('Subscriptor Management Update Component', () => {
    let comp: SubscriptorUpdateComponent;
    let fixture: ComponentFixture<SubscriptorUpdateComponent>;
    let service: SubscriptorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LacusticoTestModule],
        declarations: [SubscriptorUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SubscriptorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubscriptorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubscriptorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Subscriptor(123);
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
        const entity = new Subscriptor();
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
