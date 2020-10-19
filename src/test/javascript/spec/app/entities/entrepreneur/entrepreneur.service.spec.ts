import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EntrepreneurService } from 'app/entities/entrepreneur/entrepreneur.service';
import { IEntrepreneur, Entrepreneur } from 'app/shared/model/entrepreneur.model';

describe('Service Tests', () => {
  describe('Entrepreneur Service', () => {
    let injector: TestBed;
    let service: EntrepreneurService;
    let httpMock: HttpTestingController;
    let elemDefault: IEntrepreneur;
    let expectedResult: IEntrepreneur | IEntrepreneur[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EntrepreneurService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Entrepreneur(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        false
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Entrepreneur', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Entrepreneur()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Entrepreneur', () => {
        const returnedFromService = Object.assign(
          {
            email: 'BBBBBB',
            name: 'BBBBBB',
            description: 'BBBBBB',
            phoneNumber: 1,
            schedule: 'BBBBBB',
            picture: 'BBBBBB',
            webSite: 'BBBBBB',
            facebookPage: 'BBBBBB',
            instagramPage: 'BBBBBB',
            activated: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Entrepreneur', () => {
        const returnedFromService = Object.assign(
          {
            email: 'BBBBBB',
            name: 'BBBBBB',
            description: 'BBBBBB',
            phoneNumber: 1,
            schedule: 'BBBBBB',
            picture: 'BBBBBB',
            webSite: 'BBBBBB',
            facebookPage: 'BBBBBB',
            instagramPage: 'BBBBBB',
            activated: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Entrepreneur', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
