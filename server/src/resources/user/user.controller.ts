import {
  AuthGuard,
  AuthService,
  CaseUser,
  Paginator,
  Permission,
  SelectOption
} from '@casejs/nest-library'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards
} from '@nestjs/common'
import { Request } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'

import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserMyselfDto } from './dtos/update-user-myself.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { User } from './user.entity'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Get()
  @Permission('browseUsers')
  async index(
    @Query('userIds') userIds?: string[],
    @Query('roleName') roleName?: string,
    @Query('withoutPagination', ParseBoolPipe) withoutPagination?: boolean,
    @Query('toXLS', ParseBoolPipe) toXLS?: boolean,
    @Query('page') page?: string,
    @Query('orderBy') orderBy?: string,
    @Query('orderByDesc') orderByDesc?: string
  ): Promise<Paginator<User> | User[] | string> {
    return this.userService.index({
      page: parseInt(page, 10),
      userIds,
      roleName,
      withoutPagination,
      orderBy,
      orderByDesc,
      toXLS
    })
  }

  @Get('select-options')
  @UseGuards(AuthGuard)
  async listSelectOptions(
    @Query('roleName') roleName?: string,
    @Query('orderBy') orderBy?: string,
    @Query('orderByDesc') orderByDesc?: string
  ): Promise<SelectOption[]> {
    const users: User[] = (await this.userService.index({
      roleName,
      withoutPagination: true,
      orderBy,
      orderByDesc
    })) as User[]

    return users.map((u: User) => ({
      label: u.name,
      value: u.id
    }))
  }

  @Get('/is-empty')
  async isEmpty(): Promise<boolean> {
    return this.userService.isDatabaseEmpty()
  }

  @Get('/myself')
  async showMyself(@Req() req: Request): Promise<User> {
    const currentUser: CaseUser = await this.authService.getUserFromToken(
      req.headers?.authorization
    )
    return this.userService.show(currentUser.id)
  }

  @Get('/:id')
  @Permission('readUsers')
  public async show(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.show(id)
  }

  @Post()
  @Permission('addUsers')
  async store(
    @Body()
    userDto: CreateUserDto
  ): Promise<User> {
    return this.userService.store(userDto)
  }

  // Each user can update his or her user, but without changing his or her role.
  @Put('/myself')
  async updateMyself(
    @Body() userDto: UpdateUserMyselfDto,
    @Req() req: Request
  ): Promise<UpdateResult> {
    const currentUser: User = (await this.authService.getUserFromToken(
      req.headers?.authorization
    )) as User
    return this.userService.updateMyself(currentUser, userDto)
  }

  @Put('/:id')
  @Permission('editUsers')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: UpdateUserDto
  ): Promise<UpdateResult> {
    return this.userService.update(id, userDto)
  }

  @Patch('/:id/toggle-active')
  @Permission('editUsers')
  async toggleActive(
    @Param('id', ParseIntPipe) id: number
  ): Promise<UpdateResult> {
    return this.userService.toggleActive(id)
  }

  @Delete('/:id')
  @Permission('deleteUsers')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.userService.destroy(id)
  }
}
