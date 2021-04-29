import { MenuItem } from '@case-app/angular-library'

export const menuItems: MenuItem[] = [
  {
    label: 'Collaborateurs',
    permissionsOr: ['browseUsers', 'browseRoles'],
    icon: 'icon-user',
    items: [
      {
        label: 'Collaborateurs',
        permissionsOr: ['browseUsers'],
        routePath: '/users',
      },
      {
        label: 'Roles',
        permissionsOr: ['browseRoles'],
        routePath: '/roles',
      },
    ],
  },
]
