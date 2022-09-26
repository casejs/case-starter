import {
  ActionType,
  Gender,
  LinkType,
  ResourceDefinition
} from 'case-client-core'

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
      label: 'Editer',
      permission: 'editUsers',
      action: (user) => ({
        type: ActionType.Link,
        link: {
          path: `${userDefinition.path}/${user.id}/edit`
        }
      })
    },
    {
      label: 'Effacer',
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
