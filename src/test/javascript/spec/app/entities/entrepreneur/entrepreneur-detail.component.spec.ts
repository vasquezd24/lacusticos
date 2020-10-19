import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { LacusticoTestModule } from '../../../test.module';
import { EntrepreneurDetailComponent } from 'app/entities/entrepreneur/entrepreneur-detail.component';
import { Entrepreneur } from 'app/shared/model/entrepreneur.model';

describe('Component Tests', () => {
  describe('Entrepreneur Management Detail Component', () => {
    let comp: EntrepreneurDetailComponent;
    let fixture: ComponentFixture<EntrepreneurDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ entrepreneur: new Entrepreneur(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LacusticoTestModule],
        declarations: [EntrepreneurDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EntrepreneurDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EntrepreneurDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load entrepreneur on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.entrepreneur).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
