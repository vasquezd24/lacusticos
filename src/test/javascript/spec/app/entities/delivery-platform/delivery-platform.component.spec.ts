import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LacusticoTestModule } from '../../../test.module';
import { DeliveryPlatformComponent } from 'app/entities/delivery-platform/delivery-platform.component';
import { DeliveryPlatformService } from 'app/entities/delivery-platform/delivery-platform.service';
import { DeliveryPlatform } from 'app/shared/model/delivery-platform.model';

describe('Component Tests', () => {
  describe('DeliveryPlatform Management Component', () => {
    let comp: DeliveryPlatformComponent;
    let fixture: ComponentFixture<DeliveryPlatformComponent>;
    let service: DeliveryPlatformService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LacusticoTestModule],
        declarations: [DeliveryPlatformComponent],
      })
        .overrideTemplate(DeliveryPlatformComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DeliveryPlatformComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DeliveryPlatformService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DeliveryPlatform(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.deliveryPlatforms && comp.deliveryPlatforms[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
