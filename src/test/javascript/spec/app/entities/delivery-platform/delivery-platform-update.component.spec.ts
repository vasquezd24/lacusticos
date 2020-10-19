import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { LacusticoTestModule } from '../../../test.module';
import { DeliveryPlatformUpdateComponent } from 'app/entities/delivery-platform/delivery-platform-update.component';
import { DeliveryPlatformService } from 'app/entities/delivery-platform/delivery-platform.service';
import { DeliveryPlatform } from 'app/shared/model/delivery-platform.model';

describe('Component Tests', () => {
  describe('DeliveryPlatform Management Update Component', () => {
    let comp: DeliveryPlatformUpdateComponent;
    let fixture: ComponentFixture<DeliveryPlatformUpdateComponent>;
    let service: DeliveryPlatformService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LacusticoTestModule],
        declarations: [DeliveryPlatformUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DeliveryPlatformUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DeliveryPlatformUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DeliveryPlatformService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DeliveryPlatform(123);
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
        const entity = new DeliveryPlatform();
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
