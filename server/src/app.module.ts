import bugsnagPluginExpress from '@bugsnag/plugin-express'
import { CaseNestLibraryModule, PermissionGuard } from '@case-app/nest-library'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BugsnagModule } from '@nkaurelien/nest-bugsnag'
import { ScheduleModule } from 'nest-schedule'
import { Connection } from 'typeorm'

import { Notification } from '../../shared/entities/notification.entity'
import { Permission } from '../../shared/entities/permission.entity'
import { Role } from '../../shared/entities/role.entity'
import { User } from '../../shared/entities/user.entity'
import { appConnectionOptions } from './app.connection.options'
import { UserModule } from './resources/user/user.module'
import { SearchModule } from './search/search.module'
import { TaskService } from './services/task/task.service'

@Module({
  imports: [
    CaseNestLibraryModule.forRoot({
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
    ScheduleModule.register(),
    SearchModule
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
