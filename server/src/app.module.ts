import Bugsnag from '@bugsnag/js'
import { CaseCoreModule, PermissionGuard } from '@casejs/nest-library'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { APP_GUARD, Reflector } from '@nestjs/core'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'

import { appConnectionOptions } from '../src/database/app.connection.options'
import { appImageSizes } from './app.image-sizes'
import { Notification } from './resources/case/notification.entity'
import { Permission } from './resources/case/permission.entity'
import { Role } from './resources/case/role.entity'
import { UserLite } from './resources/case/user-lite.entity'
import { UserModule } from './resources/user/user.module'
import { SearchModule } from './search/search.module'
import { TaskModule } from './task/task.module'

if (process.env.ENABLE_BUGSNAG === 'true') {
  Bugsnag.start({
    apiKey: process.env.BUGSNAG_API_KEY,
    releaseStage: process.env.BUGSNAG_RELEASE_STAGE
  })
}

@Module({
  imports: [
    TypeOrmModule.forRoot(appConnectionOptions),
    CaseCoreModule.forRoot({
      userEntity: UserLite,
      notificationEntity: Notification,
      permissionEntity: Permission,
      roleEntity: Role,
      connectionOptions: appConnectionOptions,
      reflector: new Reflector(),
      imageSizes: appImageSizes
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
