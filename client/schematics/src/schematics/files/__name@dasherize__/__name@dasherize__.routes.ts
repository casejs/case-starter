import { Route } from '@angular/router'

import { AuthGuard, PermissionGuard } from 'abacus-angular-library'

import { <%= classify(name) %>CreateEditComponent } from './<%= dasherize(name) %>-create-edit/<%= dasherize(name) %>-create-edit.component'
import { <%= classify(name) %>ListComponent } from './<%= dasherize(name) %>-list/<%= dasherize(name) %>-list.component'


export const <%= camelize(name) %>Routes: Route[] = [
  {
    path: '<%= dasherize(displayName) %>s',
    component: <%= classify(name) %>ListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '<%= dasherize(displayName) %>s/create',
    component: <%= classify(name) %>CreateEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permission: 'add<%= classify(name) %>s',
      mode: 'create',
    },
  },
  {
    path: '<%= dasherize(displayName) %>s/:id/edit',
    component: <%= classify(name) %>CreateEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      mode: 'edit',
      permission: 'edit<%= classify(name) %>s',
    },
  },
]
