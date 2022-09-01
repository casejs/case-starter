import { AuthService } from '@case-app/nest-library'
import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from '../user.controller'
import { User } from '../user.entity'
import { UserService } from '../user.service'

describe('UserController', () => {
  let userController: UserController
  let userService: UserService

  const testUser = {
    id: 1,
    name: `Test user`,
    email: `test-user@case.app`,
    password: 'password',
    image: 'image',
    token: 'token',
    isGhost: false,
    isActive: true,
    color: 'blue'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserController,
        {
          provide: UserService,
          useValue: {
            show: jest.fn()
          }
        },
        {
          provide: AuthService,
          useValue: {
            show: () => Promise.resolve({})
          }
        }
      ]
    }).compile()
    userController = module.get<UserController>(UserController)
    userService = module.get<UserService>(UserService)
  })

  describe('GET /:id', () => {
    it('should return an user', async () => {
      jest
        .spyOn(userService, 'show')
        .mockReturnValue(Promise.resolve(testUser as User))

      expect(await userController.show(testUser.id)).toBe(testUser)
      expect(userService.show).toHaveBeenCalledWith(testUser.id)
    })
  })
})
