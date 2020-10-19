import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LacusticoTestModule } from '../../../test.module';
import { DeliveryPlatformDetailComponent } from 'app/entities/delivery-platform/delivery-platform-detail.component';
import { DeliveryPlatform } from 'app/shared/model/delivery-platform.model';

describe('Component Tests', () => {
  describe('DeliveryPlatform Management Detail Component', () => {
    let comp: DeliveryPlatformDetailComponent;
    let fixture: ComponentFixture<DeliveryPlatformDetailComponent>;
    const route = ({ data: of({ deliveryPlatform: new DeliveryPlatform(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LacusticoTestModule],
        declarations: [DeliveryPlatformDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DeliveryPlatformDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DeliveryPlatformDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load deliveryPlatform on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.deliveryPlatform).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
