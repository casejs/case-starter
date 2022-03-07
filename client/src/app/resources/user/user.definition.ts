import {
  ActionType,
  Gender,
  LinkType,
  ResourceDefinition
} from '@case-app/angular-library'

export const userDefinition: ResourceDefinition = {
  title: 'Collaborateurs',
  nameSingular: 'collaborateur',
  namePlural: 'collaborateurs',
  className: 'User',
  icon: 'icon-user',
  gender: Gender.Masculine,
  mainIdentifier: 'name',
  slug: 'users',
  path: 'users',
  hasDetailPage: false,
  hasListPage: true,
  buttons: [LinkType.CREATE],
  defaultLink: LinkType.EDIT,
  childrenThatPreventDelete: [],
  dropdownLinks: [
    {
      label: 'Editer collaborateur',
      permission: 'editUsers',
      action: (user) => ({
        type: ActionType.Link,
        link: {
          path: `${userDefinition.path}/${user.id}/edit`
        }
      })
    },
    {
      label: 'Effacer collaborateur',
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
