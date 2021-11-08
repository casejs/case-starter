import { Route } from '@angular/router'
import { AuthGuard, PermissionGuard } from '@case-app/angular-library'

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
      mode: 'create'
    }
  },
  {
    path: 'users/myself/edit',
    component: UserCreateEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      mode: 'edit',
      permission: 'readOwnUsers',
      editMyself: true
    }
  },
  {
    path: 'users/:id/edit',
    component: UserCreateEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      mode: 'edit',
      permission: 'editUsers'
    }
  }
]
