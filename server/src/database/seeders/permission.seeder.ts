import { DataSource, EntityManager } from 'typeorm'

import { Permission } from '../../resources/case/permission.entity'
import { allPermissions } from './content/permissions.content'

export class PermissionSeeder {
  entityManager: EntityManager

  constructor(dataSource: DataSource) {
    this.entityManager = dataSource.manager
  }
  async seed(): Promise<Permission[]> {
    console.log('\x1b[35m', '[] Seeding permissions...')

    return Promise.all(
      allPermissions.map((permissionName: string) => {
        const permission: Permission = this.entityManager.create(Permission, {
          name: permissionName
        })
        return this.entityManager.save(permission)
      })
    )
  }
}
