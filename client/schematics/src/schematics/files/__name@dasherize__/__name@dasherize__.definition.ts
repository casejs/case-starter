import { Gender, LinkType, ResourceDefinition } from 'abacus-angular-library'

export const <%= camelize(name) %>Definition: ResourceDefinition = {
  title: '<%= classify(displayName) %>s',
  nameSingular: '<%= displayName %>',
  namePlural: '<%= displayName %>s',
  gender: Gender.<%= gender %>,
  slug: '<%= dasherize(name) %>s',
  path: '<%= dasherize(displayName) %>s',
  hasDetailPage: true,
  hasListPage: true,
  buttons: [LinkType.CREATE],
  defaultLink: LinkType.DETAIL,
  childrenThatPreventDelete: [],
  dropdownLinks: [
    {
      type: LinkType.EDIT,
      permission: 'edit<%= classify(name) %>',
    },
    {
      type: LinkType.DELETE,
      permission: 'delete<%= classify(name) %>',
    },
  ]
}
