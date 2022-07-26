import Bugsnag from '@bugsnag/js'
import { CaseNestLibraryModule, PermissionGuard } from '@case-app/nest-library'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { APP_GUARD, Reflector } from '@nestjs/core'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Notification } from '../../shared/entities/notification.entity'
import { Permission } from '../../shared/entities/permission.entity'
import { Role } from '../../shared/entities/role.entity'
import { User } from '../../shared/entities/user.entity'
import { appConnectionOptions } from '../database/app.connection.options'
import { UserModule } from './resources/user/user.module'
import { SearchModule } from './search/search.module'
import { TaskModule } from './task/task.module'

Bugsnag.start({
  apiKey: process.env.BUGSNAG_API_KEY,
  releaseStage: process.env.BUGSNAG_RELEASE_STAGE
})

@Module({
  imports: [
    TypeOrmModule.forRoot(appConnectionOptions),
    CaseNestLibraryModule.forRoot({
      userEntity: User,
      notificationEntity: Notification,
      permissionEntity: Permission,
      roleEntity: Role,
      connectionOptions: appConnectionOptions,
      reflector: new Reflector()
    }),
    ScheduleModule.forRoot(),
    UserModule,
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
  configure(consumer: MiddlewareConsumer): void {}
}
