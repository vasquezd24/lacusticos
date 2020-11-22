import { Route } from '@angular/router';

import { HomeSearchComponent } from 'app/search/home.search';

export const homeSearchRoute: Route = {
  path: 'search',
  component: HomeSearchComponent,
  data: {
    authorities: [],
    pageTitle: 'home.title',
  },
};
