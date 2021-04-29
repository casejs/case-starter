import bugsnagPluginExpress from '@bugsnag/plugin-express'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BugsnagModule } from '@nkaurelien/nest-bugsnag'
import {
  AbacusNestLibraryModule,
  PermissionGuard
} from '@case-app/nest-library'
import { ScheduleModule } from 'nest-schedule'
import { Connection } from 'typeorm'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

import { Notification } from '../../shared/entities/notification.entity'
import { Permission } from '../../shared/entities/permission.entity'
import { Role } from '../../shared/entities/role.entity'
import { User } from '../../shared/entities/user.entity'
import { UserModule } from './resources/user/user.module'
import { TaskService } from './services/task/task.service'
import { appConnectionOptions } from './app.connection.options'

@Module({
  imports: [
    AbacusNestLibraryModule.forRoot({
      userEntity: User,
      notificationEntity: Notification,
      permissionEntity: Permission,
      roleEntity: Role,
      connectionOptions: appConnectionOptions
    }),
    BugsnagModule.forRoot({
      releaseStage: process.env.BUGSNAG_RELEASE_STAGE || 'development',
      apiKey: process.env.BUGSNAG_API_KEY,
      autoDetectErrors: true,
      enabledErrorTypes: {
        unhandledExceptions: true,
        unhandledRejections: true
      },
      enabledReleaseStages: ['production', 'staging'],
      plugins: [bugsnagPluginExpress]
    }),
    TypeOrmModule.forRoot(appConnectionOptions),
    UserModule,
    ScheduleModule.register()
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionGuard
    },
    TaskService
  ]
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
  configure(consumer: MiddlewareConsumer): void {}
}
