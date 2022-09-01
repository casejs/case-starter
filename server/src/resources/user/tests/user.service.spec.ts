import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../user.entity'
import { UserService } from '../user.service'
import { Test, TestingModule } from '@nestjs/testing'
import { Role } from '../../case/role.entity'
import { ExcelService, PaginationService } from '@case-app/nest-library'

describe('UserService', () => {
  let userService: UserService
  let repositoryMock: MockType<Repository<User>>

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
            paginate: jest.fn()
          }
        },
        {
          provide: ExcelService,
          useValue: {
            export: jest.fn()
          }
        }
      ]
    }).compile()
    userService = module.get<UserService>(UserService)
    repositoryMock = module.get(getRepositoryToken(User))
  })

  it('should show an user', async () => {
    const user = { id: 1, name: 'Test' }
    // Now you can control the return value of your mock's methods
    repositoryMock.findOneOrFail.mockReturnValue(user)
    await expect(userService.show(user.id)).resolves.toEqual(user)
    // And make assertions on how often and with what params your mock's methods are called
    expect(repositoryMock.findOneOrFail).toHaveBeenCalledWith({
      relations: { role: true },
      where: { id: user.id }
    })
  })
})

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOneOrFail: jest.fn()
    // ...
  })
)

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>
}
