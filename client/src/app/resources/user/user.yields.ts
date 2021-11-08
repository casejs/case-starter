import { YieldType, Yield } from '@case-app/angular-library'

export const userYields: Yield[] = [
  {
    label: 'Collaborateur',
    property: 'imageObjects',
    secondProperty: 'name',
    orderByProperty: 'name',
    type: YieldType.Image,
    className: 'is-narrow'
  },
  {
    label: 'Rôle',
    property: 'role.displayName'
  }
]
