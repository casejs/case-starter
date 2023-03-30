import {
  ExcelService,
  PaginationService,
  Paginator
} from '@casejs/nest-library'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'

import { Role } from '../../case/role.entity'
import { CreateUserDto } from '../dtos/create-user.dto'
import { User } from '../user.entity'
import { UserService } from '../user.service'

describe('UserService', () => {
  let userService: UserService
  let repositoryMock: MockType<Repository<User>>

  const testUser = { id: 1, name: 'Test' }
  const testUserDto: CreateUserDto = {
    name: 'test user',
    email: 'example@domain.com',
    password: 'password',
    roleId: 1,
    isActive: true,
    image: 'path-to-image.jpg'
  }
  const createQueryBuilder: any = {
    select: () => createQueryBuilder,
    addSelect: () => createQueryBuilder,
    orderBy: () => createQueryBuilder,
    groupBy: () => createQueryBuilder,
    where: () => createQueryBuilder,
    andWhere: () => createQueryBuilder,
    leftJoinAndSelect: () => createQueryBuilder,
    getMany: () => [testUser],
    getOne: () => testUser
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory
        },
        {
          provide: getRepositoryToken(Role),
          useFactory: repositoryMockFactory
        },
        {
          provide: PaginationService,
          useValue: {
            paginate: () => ({
              data: [testUser],
              currentPage: 1,
              lastPage: 1,
              from: 1,
              to: 1,
              total: 1,
              perPage: 1
            })
          }
        },
        {
          provide: ExcelService,
          useValue: {
            export: () => 'path-to-csv-file.csv'
          }
        }
      ]
    }).compile()
    userService = module.get<UserService>(UserService)
    repositoryMock = module.get(getRepositoryToken(User))
  })

  it('should list users', async () => {
    expect.assertions(8)

    repositoryMock.createQueryBuilder?.mockImplementation(
      () => createQueryBuilder
    )

    const userPaginator: Paginator<User> = (await userService.index(
      {}
    )) as Paginator<User>
    const users: User[] = (await userService.index({
      withoutPagination: 'true'
    })) as User[]

    expect(Array.isArray(users)).toBe(true)
    expect(userPaginator).toHaveProperty('currentPage')
    expect(userPaginator).toHaveProperty('lastPage')
    expect(userPaginator).toHaveProperty('from')
    expect(userPaginator).toHaveProperty('to')
    expect(userPaginator).toHaveProperty('total')
    expect(userPaginator).toHaveProperty('perPage')
    expect(Array.isArray(userPaginator.data)).toBe(true)
  })

  it('should export users', async () => {
    const query: any = {
      getMany: () => Promise.resolve([testUser])
    }

    const exportPath = await userService.export(query)

    expect(typeof exportPath).toBe('string')
  })

  it('should show an user', async () => {
    expect.assertions(2)
    repositoryMock.findOneOrFail?.mockReturnValue(testUser)

    await expect(userService.show(testUser.id)).resolves.toEqual(testUser)
    expect(repositoryMock.findOneOrFail).toHaveBeenCalledWith({
      relations: { role: true },
      where: { id: testUser.id }
    })
  })

  it('should store an user', async () => {
    expect.assertions(4)

    const dummyId = 56

    repositoryMock.create?.mockReturnValue(testUserDto)
    repositoryMock.save?.mockReturnValue(
      Object.assign(testUserDto, { id: dummyId })
    )

    const storedUser: User = await userService.store(testUserDto)

    expect(storedUser).toHaveProperty('id', dummyId)
    expect(storedUser).toHaveProperty('token')
    expect(storedUser).toHaveProperty('password')
    expect(storedUser.password).not.toBe('password')
  })

  it('should update an user', async () => {
    repositoryMock.createQueryBuilder?.mockImplementation(
      () => createQueryBuilder
    )
    repositoryMock.create?.mockReturnValue(testUserDto)

    const updatedResult: UpdateResult = await userService.update(1, testUserDto)

    expect(repositoryMock.create).toHaveBeenCalled()
    expect(repositoryMock.update).toHaveBeenCalled()
  })

  it('should delete an user', async () => {
    expect.assertions(2)

    const mockDeleteResult = { raw: 'mock data delete result' }

    repositoryMock.delete?.mockReturnValue(mockDeleteResult)
    repositoryMock.findOneOrFail?.mockReturnValue(testUser)

    await expect(userService.destroy(testUser.id)).resolves.toEqual(
      mockDeleteResult
    )
    expect(repositoryMock.delete).toHaveBeenCalledWith(testUser.id)
  })
})

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    create: jest.fn(),
    createQueryBuilder: jest.fn(),
    delete: jest.fn(),
    findOneOrFail: jest.fn(),
    save: jest.fn(),
    update: jest.fn()
  })
)

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>
}
