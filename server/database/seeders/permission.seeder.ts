import { Connection, EntityManager } from 'typeorm'
import { Permission } from '../../../shared/entities/permission.entity'
import { allPermissions } from './content/permissions.content'

export class PermissionSeeder {
  entityManager: EntityManager

  constructor(connection: Connection) {
    this.entityManager = connection.createEntityManager()
  }

  async seed(): Promise<Permission[]> {
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
