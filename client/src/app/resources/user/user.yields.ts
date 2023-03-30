import { ActionType, User, Yield, YieldType } from '@casejs/angular-library'

export const userYields: Yield[] = [
  {
    label: 'Name',
    property: 'image',
    secondProperty: 'name',
    orderByProperty: 'name',
    type: YieldType.Image,
    className: 'is-narrow'
  },
  {
    label: 'Role',
    property: 'role.displayName',
    secondProperty: 'role.name'
  },
  {
    label: 'Active',
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
