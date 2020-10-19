import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LacusticoTestModule } from '../../../test.module';
import { SubscriptorComponent } from 'app/entities/subscriptor/subscriptor.component';
import { SubscriptorService } from 'app/entities/subscriptor/subscriptor.service';
import { Subscriptor } from 'app/shared/model/subscriptor.model';

describe('Component Tests', () => {
  describe('Subscriptor Management Component', () => {
    let comp: SubscriptorComponent;
    let fixture: ComponentFixture<SubscriptorComponent>;
    let service: SubscriptorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LacusticoTestModule],
        declarations: [SubscriptorComponent],
      })
        .overrideTemplate(SubscriptorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubscriptorComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubscriptorService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Subscriptor(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.subscriptors && comp.subscriptors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
