import { Route } from '@angular/router'
import {
  AuthGuard,
  PermissionGuard,
  ResourceMode
} from '@casejs/angular-library'

import { UserCreateEditComponent } from './user-create-edit.component'
import { UserListComponent } from './user-list.component'

export const userRoutes: Route[] = [
  // Users.
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/create',
    component: UserCreateEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permission: 'addUsers',
      mode: ResourceMode.Create
    }
  },
  {
    path: 'users/myself/edit',
    component: UserCreateEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      mode: ResourceMode.Edit,
      permission: 'readOwnUsers',
      editMyself: true
    }
  },
  {
    path: 'users/:id/edit',
    component: UserCreateEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      mode: ResourceMode.Edit,
      permission: 'editUsers'
    }
  }
]
