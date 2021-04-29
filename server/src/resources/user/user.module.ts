import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserController } from './user.controller'
import { User } from '../../../../shared/entities/user.entity'
import { UserService } from './user.service'
import { Notification } from '../../../../shared/entities/notification.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Notification])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
