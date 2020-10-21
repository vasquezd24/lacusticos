import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IProduct, Product } from 'app/shared/model/product.model';
import { ProductService } from './product.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category/category.service';
import { IEntrepreneur } from 'app/shared/model/entrepreneur.model';
import { EntrepreneurService } from 'app/entities/entrepreneur/entrepreneur.service';

type SelectableEntity = ICategory | IEntrepreneur;

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html',
})
export class ProductUpdateComponent implements OnInit {
  isSaving = false;
  categories: ICategory[] = [];
  entrepreneurs: IEntrepreneur[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [null, [Validators.required]],
    price: [null, [Validators.required]],
    productImage: [],
    productImageContentType: [],
    activated: [null, [Validators.required]],
    category: [],
    entrepreneur: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected productService: ProductService,
    protected categoryService: CategoryService,
    protected entrepreneurService: EntrepreneurService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);

      this.categoryService.query().subscribe((res: HttpResponse<ICategory[]>) => (this.categories = res.body || []));

      this.entrepreneurService.query().subscribe((res: HttpResponse<IEntrepreneur[]>) => (this.entrepreneurs = res.body || []));
    });
  }

  updateForm(product: IProduct): void {
    this.editForm.patchValue({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      productImage: product.productImage,
      productImageContentType: product.productImageContentType,
      activated: product.activated,
      category: product.category,
      entrepreneur: product.entrepreneur,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('lacusticoApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const product = this.createFromForm();
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  private createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      price: this.editForm.get(['price'])!.value,
      productImageContentType: this.editForm.get(['productImageContentType'])!.value,
      productImage: this.editForm.get(['productImage'])!.value,
      activated: this.editForm.get(['activated'])!.value,
      category: this.editForm.get(['category'])!.value,
      entrepreneur: this.editForm.get(['entrepreneur'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
