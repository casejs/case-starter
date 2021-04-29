import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards
} from '@nestjs/common'
import { DeleteResult, UpdateResult } from 'typeorm'

import {
  AuthService,
  Permission,
  AuthGuard,
  Paginator,
  SelectOption
} from '@case-app/nest-library'

import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserMyselfDto } from './dtos/update-user-myself.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { User } from '../../../../shared/entities/user.entity'
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
    @Query('withoutPagination') withoutPagination?: string,
    @Query('includeNotActive') includeNotActive?: string,
    @Query('page') page?: string,
    @Query('toXLS') toXLS?: string,
    @Query('orderBy') orderBy?: string,
    @Query('orderByDesc') orderByDesc?: string
  ): Promise<Paginator<User> | User[] | string> {
    return await this.userService.index({
      page: parseInt(page, 10),
      userIds,
      roleName,
      withoutPagination,
      includeNotActive,
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
      withoutPagination: 'true',
      orderBy,
      orderByDesc
    })) as User[]

    return users.map((u: User) => ({
      label: u.name,
      value: u.id.toString()
    }))
  }

  @Get('/myself')
  async showMyself(@Req() req: any): Promise<User> {
    // TODO: uncomment
    // const currentUser: User = await this.authService.getUserFromToken(req)
    // return await this.userService.show(currentUser.id, checkBonuses)
    return await this.userService.show(1)
  }

  @Get('/:id')
  @Permission('readUsers')
  public async show(@Param('id') id: string): Promise<User> {
    return await this.userService.show(id)
  }

  @Post()
  @Permission('addUsers')
  async store(
    @Body()
    userDto: CreateUserDto
  ): Promise<User> {
    return await this.userService.store(userDto)
  }

  // Each user can update his or her user, but without changing his or her role.
  @Put('/myself')
  async updateMyself(
    @Body() userDto: UpdateUserMyselfDto,
    @Req() req: any
  ): Promise<UpdateResult> {
    // TODO: Uncomment
    // const currentUser: User = await this.authService.getUserFromToken(req)
    const currentUser: User = await this.show('1')
    return await this.userService.updateMyself(currentUser, userDto)
  }

  @Put('/:id')
  @Permission('editUsers')
  async update(
    @Param('id') id: string,
    @Body() userDto: UpdateUserDto
  ): Promise<UpdateResult> {
    return await this.userService.update(id, userDto)
  }

  @Patch('/:id/toggle-active')
  @Permission('editUsers')
  async toggleActive(@Param('id') id: string): Promise<UpdateResult> {
    return await this.userService.toggleActive(id)
  }

  @Delete('/:id')
  @Permission('deleteUsers')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return await this.userService.destroy(id)
  }
}
