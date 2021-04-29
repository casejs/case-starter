import { Connection, EntityManager } from 'typeorm'

import { Permission } from '../../../shared/entities/permission.entity'
import { Role } from '../../../shared/entities/role.entity'

export class RoleSeeder {
  entityManager: EntityManager

  constructor(connection: Connection) {
    this.entityManager = connection.createEntityManager()
  }

  async seed(): Promise<Role[]> {
    const saveRolePromises: Promise<Role>[] = [
      this.entityManager.save(await this.getAdminRole()),
      this.entityManager.save(await this.getTeamMemberRole())
    ]

    return Promise.all(saveRolePromises).then(res => {
      return res
    })
  }

  // Admin role properties and permissions.
  private async getAdminRole(): Promise<Role> {
    const role: Role = this.entityManager.create(Role, {
      name: 'admin',
      displayName: 'Administrateur'
    })

    role.permissions = await this.entityManager.find(Permission)

    return role
  }

  // Team member role properties and permissions.
  private async getTeamMemberRole(): Promise<Role> {
    const role: Role = this.entityManager.create(Role, {
      name: 'teamMember',
      displayName: 'Collaborateur'
    })

    role.permissions = await this.entityManager.find(Permission)

    return role
  }
}
