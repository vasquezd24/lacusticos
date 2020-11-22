import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IEntrepreneur, Entrepreneur } from 'app/shared/model/entrepreneur.model';
import { EntrepreneurService } from './entrepreneur.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category/category.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = ICategory | IUser;

@Component({
  selector: 'jhi-entrepreneur-update',
  templateUrl: './entrepreneur-update.component.html',
})
export class EntrepreneurUpdateComponent implements OnInit {
  isSaving = false;
  categories: ICategory[] = [];
  users: IUser[] = [];
  imageHide = false;

  editForm = this.fb.group({
    id: [],
    email: [null, [Validators.required]],
    name: [null, [Validators.required]],
    description: [null, [Validators.required]],
    phoneNumber: [],
    schedule: [],
    picture: [],
    pictureContentType: [],
    webSite: [],
    facebookPage: [],
    instagramPage: [],
    activated: [null, [Validators.required]],
    category: [null, [Validators.required]],
    user: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected entrepreneurService: EntrepreneurService,
    protected categoryService: CategoryService,
    protected userService: UserService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entrepreneur }) => {
      this.updateForm(entrepreneur);

      this.categoryService.getByTypeEnt().subscribe((res: HttpResponse<ICategory[]>) => (this.categories = res.body || []));

      this.userService.getActiveUsers().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(entrepreneur: IEntrepreneur): void {
    this.editForm.patchValue({
      id: entrepreneur.id,
      email: entrepreneur.email,
      name: entrepreneur.name,
      description: entrepreneur.description,
      phoneNumber: entrepreneur.phoneNumber,
      schedule: entrepreneur.schedule,
      picture: entrepreneur.picture,
      pictureContentType: entrepreneur.pictureContentType,
      webSite: entrepreneur.webSite,
      facebookPage: entrepreneur.facebookPage,
      instagramPage: entrepreneur.instagramPage,
      activated: entrepreneur.activated,
      category: entrepreneur.category,
      user: entrepreneur.user,
    });

    if (this.editForm.get('pictureContentType')?.value === undefined || this.editForm.get('pictureContentType')?.value === null) {
      this.imageHide = false;
    } else {
      this.imageHide = true;
    }
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.imageHide = true;
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('lacusticoApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.imageHide = false;

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
    const entrepreneur = this.createFromForm();

    if (entrepreneur.id !== undefined) {
      this.subscribeToSaveResponse(this.entrepreneurService.update(entrepreneur));
    } else {
      this.subscribeToSaveResponse(this.entrepreneurService.create(entrepreneur));
    }
  }

  private createFromForm(): IEntrepreneur {
    return {
      ...new Entrepreneur(),
      id: this.editForm.get(['id'])!.value,
      email: this.editForm.get(['email'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      schedule: this.editForm.get(['schedule'])!.value,
      pictureContentType: this.editForm.get(['pictureContentType'])!.value,
      picture: this.editForm.get(['picture'])!.value,
      webSite: this.editForm.get(['webSite'])!.value,
      facebookPage: this.editForm.get(['facebookPage'])!.value,
      instagramPage: this.editForm.get(['instagramPage'])!.value,
      activated: this.editForm.get(['activated'])!.value,
      category: this.editForm.get(['category'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntrepreneur>>): void {
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
