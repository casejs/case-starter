import { Gender, LinkType, ResourceDefinition } from '@case-app/angular-library'

export const userDefinition: ResourceDefinition = {
  title: 'Collaborateurs',
  nameSingular: 'collaborateur',
  namePlural: 'collaborateurs',
  gender: Gender.Masculine,
  mainIdentifier: 'name',
  slug: 'users',
  path: 'users',
  hasDetailPage: false,
  hasListPage: true,
  buttons: [LinkType.CREATE],
  defaultLink: LinkType.DETAIL,
  childrenThatPreventDelete: [],
  dropdownLinks: [
    {
      type: LinkType.EDIT,
      permission: 'editUsers'
    },
    {
      type: LinkType.DELETE,
      permission: 'deleteUsers'
    }
  ]
}
