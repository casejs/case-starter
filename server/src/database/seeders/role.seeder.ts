import { DataSource, EntityManager } from 'typeorm'

import { Permission } from '../../resources/case/permission.entity'
import { Role } from '../../resources/case/role.entity'

export class RoleSeeder {
  entityManager: EntityManager

  constructor(dataSource: DataSource) {
    this.entityManager = dataSource.manager
  }

  async seed(): Promise<Role[]> {
    console.log('\x1b[35m', '[] Seeding roles...')

    const saveRolePromises: Promise<Role>[] = [
      this.entityManager.save(await this.getAdminRole()),
      this.entityManager.save(await this.getTeamMemberRole())
    ]

    return Promise.all(saveRolePromises).then((res) => {
      return res
    })
  }

  // Admin role properties and permissions.
  private async getAdminRole(): Promise<Role> {
    const role: Role = this.entityManager.create(Role, {
      name: 'admin',
      displayName: 'Admin'
    })

    role.permissions = await this.entityManager.find(Permission)

    return role
  }

  // Team member role properties and permissions.
  private async getTeamMemberRole(): Promise<Role> {
    const role: Role = this.entityManager.create(Role, {
      name: 'teamMember',
      displayName: 'Team Member'
    })

    const allPermissions: Permission[] = await this.entityManager.find(
      Permission
    )

    // We give to teamMember a defined list of permissions.
    const teamMemberPermissions = [
      'browseUsers',
      'browseOwnUsers',
      'readUsers',
      'readOwnUsers',
      'canLogin'
    ]

    role.permissions = allPermissions.filter((p: Permission) =>
      teamMemberPermissions.includes(p.name)
    )

    return role
  }
}
