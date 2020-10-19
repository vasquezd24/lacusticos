import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubscriptor } from 'app/shared/model/subscriptor.model';

@Component({
  selector: 'jhi-subscriptor-detail',
  templateUrl: './subscriptor-detail.component.html',
})
export class SubscriptorDetailComponent implements OnInit {
  subscriptor: ISubscriptor | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subscriptor }) => (this.subscriptor = subscriptor));
  }

  previousState(): void {
    window.history.back();
  }
}
