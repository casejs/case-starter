import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Notification } from '../case/notification.entity'
import { Role } from '../case/role.entity'
import { UserController } from './user.controller'
import { User } from './user.entity'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Notification, Role])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
