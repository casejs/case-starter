import { ActionType, User, Yield, YieldType } from '@case-app/angular-library'

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
    property: 'role.displayName',
    secondProperty: 'role.name'
  },
  {
    label: 'Addresse',
    type: YieldType.Address,
    property: 'address'
  },
  {
    label: 'Actif',
    property: 'isActive',
    type: YieldType.Switch,
    action: (user: User) => ({
      type: ActionType.Patch,
      patch: {
        path: `/users/${user.id}/toggle-active`,
        successMessage: 'User status has been changed',
        errorMessage: 'Error : could not change user status'
      }
    })
  }
]
