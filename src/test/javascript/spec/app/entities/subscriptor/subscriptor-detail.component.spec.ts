import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LacusticoTestModule } from '../../../test.module';
import { SubscriptorDetailComponent } from 'app/entities/subscriptor/subscriptor-detail.component';
import { Subscriptor } from 'app/shared/model/subscriptor.model';

describe('Component Tests', () => {
  describe('Subscriptor Management Detail Component', () => {
    let comp: SubscriptorDetailComponent;
    let fixture: ComponentFixture<SubscriptorDetailComponent>;
    const route = ({ data: of({ subscriptor: new Subscriptor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LacusticoTestModule],
        declarations: [SubscriptorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SubscriptorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubscriptorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load subscriptor on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.subscriptor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
