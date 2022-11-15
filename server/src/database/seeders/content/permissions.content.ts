const resourceNames: string[] = [
  // * Resources (keep comment for schematics).
  'users',
  'roles',
  'settings'
]
const permissionTypes: string[] = [
  'browse',
  'read',
  'edit',
  'add',
  'delete',
  'browseOwn',
  'readOwn',
  'editOwn',
  'addOwn',
  'deleteOwn'
]

export const allPermissions: string[] = [].concat(
  ...resourceNames.map(resourceName => {
    return permissionTypes.map(
      permissionType =>
        permissionType +
        resourceName.charAt(0).toUpperCase() +
        resourceName.slice(1)
    )
  }),
  // * Extra permissions.
  'canLogin',
  'browseAnalytics'
)
