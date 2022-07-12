import { CaseNestLibraryModule, PermissionGuard } from '@case-app/nest-library'
import { DynamicModule, MiddlewareConsumer, Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from 'nest-schedule'
import { Connection } from 'typeorm'

import { Notification } from '../../shared/entities/notification.entity'
import { Permission } from '../../shared/entities/permission.entity'
import { Role } from '../../shared/entities/role.entity'
import { User } from '../../shared/entities/user.entity'
import { appConnectionOptions } from './app.connection.options'
import { UserModule } from './resources/user/user.module'
import { SearchModule } from './search/search.module'
import { TaskModule } from './task/task.module'

import Bugsnag from '@bugsnag/js'
Bugsnag.start({
  apiKey: process.env.BUGSNAG_API_KEY,
  releaseStage: process.env.BUGSNAG_RELEASE_STAGE
})

@Module({
  imports: [
    CaseNestLibraryModule.forRoot({
      userEntity: User,
      notificationEntity: Notification,
      permissionEntity: Permission,
      roleEntity: Role,
      connectionOptions: appConnectionOptions
    }) as DynamicModule,
    TypeOrmModule.forRoot(appConnectionOptions),
    UserModule,
    ScheduleModule.register(),
    SearchModule,
    TaskModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionGuard
    }
  ]
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
  configure(consumer: MiddlewareConsumer): void {}
}
