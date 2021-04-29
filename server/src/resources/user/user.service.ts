import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SHA3 } from 'crypto-js'
import * as faker from 'faker'
import {
  DeleteResult,
  EntityManager,
  getConnection,
  getManager,
  Repository,
  SelectQueryBuilder,
  UpdateResult
} from 'typeorm'

import { ExcelService, PaginationService } from 'abacus-nest-library'
import { Role } from '../../../../shared/entities/role.entity'
import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserMyselfDto } from './dtos/update-user-myself.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { User } from '../../../../shared/entities/user.entity'

@Injectable()
export class UserService {
  private entityManager: EntityManager = getManager()

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @Inject(PaginationService)
    private readonly paginationService: PaginationService,
    @Inject(ExcelService) private readonly excelService: ExcelService
  ) {}

  async index({
    page,
    roleName,
    includeNotActive,
    userIds,
    orderBy,
    orderByDesc,
    toXLS,
    withoutPagination
  }: {
    page?: number
    roleName?: string
    includeNotActive?: string
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
      return await this.export(query)
    }

    if (includeNotActive !== 'true') {
      query.andWhere('user.isActive = 1')
    }

    if (withoutPagination === 'true') {
      return await query.getMany()
    }

    if (userIds) {
      query.andWhere('user.id IN (:userIds)', {
        userIds
      })
    }

    return await this.paginationService.paginate({
      query,
      resultsPerPage: 10,
      currentPage: page ? page : 1
    })
  }

  async export(query: SelectQueryBuilder<User>) {
    const users = await query.getMany()
    return await this.excelService.export(
      ['Nom', 'E-mail'],
      users.map((u: User) => [u.name, u.email]),
      'users'
    )
  }

  async show(
    id: string | number,
    checkBonuses?: string | boolean
  ): Promise<User> {
    const user: User = await this.entityManager.findOneOrFail(User, id, {
      relations: ['role']
    })

    return user
  }

  async store(userDto: CreateUserDto): Promise<User> {
    const user = this.repository.create(userDto)

    user.password = SHA3(userDto.password).toString()
    user.token = faker.random.alphaNumeric(20)
    user.role = await this.entityManager.findOneOrFail(Role, userDto.roleId)

    // TODO: null values are not boolean (ABC)
    user.isActive = !!userDto.isActive

    return this.repository.save(user)
  }

  async toggleActive(id: string): Promise<UpdateResult> {
    const user = await this.repository.findOne(id)
    if (!user) {
      throw new NotFoundException()
    }
    return await this.repository.update(id, { isActive: !user.isActive })
  }

  async update(id: string, userDto: UpdateUserDto): Promise<UpdateResult> {
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

    user.role = await this.entityManager.findOneOrFail(Role, userDto.roleId)

    // TODO: null values are not boolean (ABC)
    user.isActive = !!userDto.isActive

    return await this.repository.update(id, user)
  }

  // Any User can update his or her self but the role cannot be changed unless currentUser is Admin via classic "update()".
  async updateMyself(user: User, userDto: UpdateUserMyselfDto, image?: any) {
    user.name = userDto.name
    user.email = userDto.email

    if (userDto.password) {
      user.password = SHA3(userDto.password).toString()
    }

    user.role = await this.entityManager.findOneOrFail(Role, userDto.roleId)

    return await this.repository.update(user.id, user)
  }

  async destroy(id: string): Promise<DeleteResult> {
    const user: User = await this.show(id)

    return await getConnection()
      .getRepository(User)
      .delete(user.id)
  }
}
