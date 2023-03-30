import {
  ActionType,
  LinkType,
  ResourceDefinition
} from '@casejs/angular-library'

export const userDefinition: ResourceDefinition = {
  title: 'Users',
  nameSingular: 'user',
  namePlural: 'users',
  className: 'User',
  icon: 'icon-user',
  mainIdentifier: 'name',
  slug: 'users',
  path: 'users',
  hasDetailPage: false,
  hasListPage: true,
  buttons: [LinkType.CREATE, LinkType.EXPORT],
  defaultLink: LinkType.EDIT,
  childrenThatPreventDelete: [],
  dropdownLinks: [
    {
      label: 'Edit',
      permission: 'editUsers',
      action: (user) => ({
        type: ActionType.Link,
        link: {
          path: `${userDefinition.path}/${user.id}/edit`
        }
      })
    },
    {
      label: 'Delete',
      permission: 'deleteUsers',
      action: (user) => ({
        type: ActionType.Delete,
        delete: {
          itemToDelete: user,
          definition: userDefinition
        }
      })
    }
  ]
}
