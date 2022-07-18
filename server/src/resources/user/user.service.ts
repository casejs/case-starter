import { ExcelService, PaginationService } from '@case-app/nest-library'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SHA3 } from 'crypto-js'
import * as faker from 'faker'
import {
  DeleteResult,
  Repository,
  SelectQueryBuilder,
  UpdateResult
} from 'typeorm'

import { Role } from '../../../../shared/entities/role.entity'
import { User } from '../../../../shared/entities/user.entity'
import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserMyselfDto } from './dtos/update-user-myself.dto'
import { UpdateUserDto } from './dtos/update-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @Inject(PaginationService)
    private readonly paginationService: PaginationService,
    @Inject(ExcelService) private readonly excelService: ExcelService
  ) {}

  async index({
    page,
    roleName,
    userIds,
    orderBy,
    orderByDesc,
    toXLS,
    withoutPagination
  }: {
    page?: number
    roleName?: string
    userIds?: string[]
    orderBy?: string
    orderByDesc?: string
    toXLS?: string
    withoutPagination: string
  }) {
    const query = this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .andWhere('user.isGhost = false')

    // If orderBy param contains a ".", we are a requesting another alias (${alias}.${prop}) instead of a prop of the main alias.
    if (orderBy) {
      query.orderBy(
        orderBy.includes('.') ? orderBy : 'user.' + orderBy,
        orderByDesc && orderByDesc === 'true' ? 'DESC' : 'ASC'
      )
    } else {
      query.orderBy('user.name', 'DESC')
    }

    if (roleName) {
      query.andWhere('role.name = :roleName', { roleName })
    }

    if (toXLS === 'true') {
      return this.export(query)
    }

    if (withoutPagination === 'true') {
      return query.getMany()
    }

    if (userIds) {
      query.andWhere('user.id IN (:userIds)', {
        userIds
      })
    }

    return this.paginationService.paginate({
      query,
      resultsPerPage: 10,
      currentPage: page ? page : 1
    })
  }

  async export(query: SelectQueryBuilder<User>) {
    const users = await query.getMany()
    return this.excelService.export(
      ['Nom', 'E-mail'],
      users.map((u: User) => [u.name, u.email]),
      'users'
    )
  }

  async show(id: number): Promise<User> {
    const user: User = await this.repository.findOneOrFail({
      where: { id },
      relations: {
        role: true
      }
    })

    return user
  }

  async store(userDto: CreateUserDto): Promise<User> {
    const user = this.repository.create(userDto)

    user.password = SHA3(userDto.password).toString()
    user.token = faker.random.alphaNumeric(20)
    user.role = await this.roleRepository.findOneOrFail({
      where: {
        id: userDto.roleId
      }
    })

    // TODO: null values are not boolean.
    user.isActive = !!userDto.isActive

    return this.repository.save(user)
  }

  async toggleActive(id: number): Promise<UpdateResult> {
    const user = await this.repository.findOneOrFail({
      where: {
        id
      }
    })

    return this.repository.update(id, { isActive: !user.isActive })
  }

  async update(id: number, userDto: UpdateUserDto): Promise<UpdateResult> {
    const previousUser: User = await this.repository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', {
        id
      })
      .getOne()

    if (!previousUser) {
      throw new NotFoundException('User not found.')
    }

    const user: User = this.repository.create(userDto)

    if (userDto.password) {
      user.password = SHA3(userDto.password).toString()
    } else {
      user.password = previousUser.password
    }

    user.role = await this.roleRepository.findOneOrFail({
      where: {
        id: userDto.roleId
      }
    })

    // TODO: null values are not boolean (ABC)
    user.isActive = !!userDto.isActive

    return this.repository.update(id, user)
  }

  // Any User can update his or her self but the role cannot be changed unless currentUser is Admin via classic "update()".
  async updateMyself(user: User, userDto: UpdateUserMyselfDto, image?: any) {
    user.name = userDto.name
    user.email = userDto.email

    if (userDto.password) {
      user.password = SHA3(userDto.password).toString()
    }

    user.role = await this.roleRepository.findOneOrFail({
      where: {
        id: userDto.roleId
      }
    })

    return this.repository.update(user.id, user)
  }

  async destroy(id: number): Promise<DeleteResult> {
    const user: User = await this.show(id)

    return this.repository.delete(user.id)
  }
}
