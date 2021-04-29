import { Connection, createConnection } from 'typeorm'

import 'dotenv/config'
import { PermissionSeeder } from './permission.seeder'
import { appConnectionOptions } from '../../src/app.connection.options'
import { SettingSeeder } from './setting.seeder'
import { RoleSeeder } from './role.seeder'
import { UserSeeder } from './user.seeder'

seed()

async function seed() {
  const settingCount = 10
  const userCount = 40

  // Create connection
  const connection: Connection = await createConnection(appConnectionOptions)

  const settingSeeder: SettingSeeder = new SettingSeeder(
    connection,
    settingCount
  )
  const permissionSeeder: PermissionSeeder = new PermissionSeeder(connection)
  const roleSeeder: RoleSeeder = new RoleSeeder(connection)
  const userSeeder: UserSeeder = new UserSeeder(connection, userCount)

  const queryRunner = connection.createQueryRunner()

  const deleteTablePromises: Promise<void>[] = [
    // * Table names (keep comment for schematics).
    'notifications',
    'users',
    'permission_role',
    'permissions',
    'roles',
    'settings'
  ].map(async (tableName: string) => {
    await queryRunner.query(`DELETE FROM ${tableName}`)
    await queryRunner.query(`ALTER TABLE ${tableName} AUTO_INCREMENT = 1`)

    return
  })

  await Promise.all(deleteTablePromises)

  await permissionSeeder.seed()
  await settingSeeder.seed()
  await roleSeeder.seed()
  await userSeeder.seed()

  await connection.close()
}
