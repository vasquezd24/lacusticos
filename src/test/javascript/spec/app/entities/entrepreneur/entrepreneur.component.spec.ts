import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LacusticoTestModule } from '../../../test.module';
import { EntrepreneurComponent } from 'app/entities/entrepreneur/entrepreneur.component';
import { EntrepreneurService } from 'app/entities/entrepreneur/entrepreneur.service';
import { Entrepreneur } from 'app/shared/model/entrepreneur.model';

describe('Component Tests', () => {
  describe('Entrepreneur Management Component', () => {
    let comp: EntrepreneurComponent;
    let fixture: ComponentFixture<EntrepreneurComponent>;
    let service: EntrepreneurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LacusticoTestModule],
        declarations: [EntrepreneurComponent],
      })
        .overrideTemplate(EntrepreneurComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EntrepreneurComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EntrepreneurService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Entrepreneur(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.entrepreneurs && comp.entrepreneurs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
