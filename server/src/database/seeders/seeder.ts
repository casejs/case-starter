import 'dotenv/config'

import { DataSource } from 'typeorm'

import {
  appConnectionOptions,
  sqliteConnectionOptions
} from '../app.connection.options'
import { PermissionSeeder } from './permission.seeder'
import { RoleSeeder } from './role.seeder'
import { SettingSeeder } from './setting.seeder'
import { UserSeeder } from './user.seeder'

seed()

async function seed() {
  // * Resource counts (keep comment for schematics).

  const settingCount = 10
  const userCount = 40

  // Create connection.
  const dataSource: DataSource = new DataSource(sqliteConnectionOptions)
  await dataSource.initialize()

  const settingSeeder: SettingSeeder = new SettingSeeder(
    dataSource,
    settingCount
  )
  const permissionSeeder: PermissionSeeder = new PermissionSeeder(dataSource)
  const roleSeeder: RoleSeeder = new RoleSeeder(dataSource)
  const userSeeder: UserSeeder = new UserSeeder(dataSource, userCount)

  const queryRunner = dataSource.createQueryRunner()

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

    // TODO: Seeder fails one time out of 3 with this line.
    // NOTE: This is not working with SQLite (no autoincrement) but we have to check if works afterwards.
    // await queryRunner.query(`ALTER TABLE ${tableName} AUTO_INCREMENT = 1`)

    return
  })
  console.log('\x1b[35m', '[] Remove all existing data...')
  await Promise.all(deleteTablePromises)

  await permissionSeeder.seed()
  await settingSeeder.seed()
  await roleSeeder.seed()
  await userSeeder.seed()

  await dataSource.destroy()
}
