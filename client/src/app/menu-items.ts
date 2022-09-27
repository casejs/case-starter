import { MenuItem } from 'case-client-core'

export const menuItems: MenuItem[] = [
  {
    label: 'Collaborateurs',
    permissionsOr: ['browseUsers', 'browseRoles'],
    icon: 'icon-user',
    items: [
      {
        label: 'Collaborateurs',
        permissionsOr: ['browseUsers'],
        routePath: '/users'
      },
      {
        label: 'Rôles',
        permissionsOr: ['browseRoles'],
        routePath: '/roles'
      }
    ]
  }
]
