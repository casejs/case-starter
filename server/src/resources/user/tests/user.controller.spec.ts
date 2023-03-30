import { AuthService, SelectOption } from '@casejs/nest-library'
import { Test, TestingModule } from '@nestjs/testing'
import { UpdateResult } from 'typeorm'

import { CreateUserDto } from '../dtos/create-user.dto'
import { UpdateUserDto } from '../dtos/update-user.dto'
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
            show: jest.fn(),
            destroy: jest.fn(),
            store: jest.fn(),
            update: jest.fn(),
            index: jest.fn()
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

  describe('UserController', () => {
    it('should list users', async () => {
      expect.assertions(2)
      const result: User[] = [testUser] as User[]

      jest.spyOn(userService, 'index').mockReturnValue(Promise.resolve(result))

      expect(await userController.index()).toBe(result)
      expect(userService.index).toHaveBeenCalled()
    })

    it('should get a list of select options', async () => {
      expect.assertions(3)
      const result: User[] = [testUser] as User[]

      jest.spyOn(userService, 'index').mockReturnValue(Promise.resolve(result))

      const selectOptions: SelectOption[] =
        await userController.listSelectOptions()

      expect(Array.isArray(selectOptions)).toBe(true)
      expect(selectOptions[0]).toHaveProperty('label')
      expect(selectOptions[0]).toHaveProperty('value')
    })

    it('should show an user', async () => {
      expect.assertions(2)
      const result: User = testUser as User

      jest.spyOn(userService, 'show').mockReturnValue(Promise.resolve(result))

      expect(await userController.show(testUser.id)).toBe(result)
      expect(userService.show).toHaveBeenCalledWith(testUser.id)
    })

    it('should store an user', async () => {
      expect.assertions(2)

      const testUserDto: CreateUserDto = Object.assign(testUser, { roleId: 1 })

      jest
        .spyOn(userService, 'store')
        .mockReturnValue(Promise.resolve(testUser as User))

      expect(await userService.store(testUserDto)).toBe(testUser)
      expect(userService.store).toHaveBeenCalledWith(testUser)
    })

    it('should update an user', async () => {
      expect.assertions(2)
      const result: UpdateResult = { raw: 'dummy', generatedMaps: [] }

      const testUserDto: UpdateUserDto = Object.assign(testUser, { roleId: 1 })

      jest.spyOn(userService, 'update').mockReturnValue(Promise.resolve(result))

      expect(await userService.update(testUser.id, testUserDto)).toBe(result)
      expect(userService.update).toHaveBeenCalledWith(testUser.id, testUser)
    })

    it('should delete an user', async () => {
      jest.spyOn(userService, 'destroy')

      await userController.delete(testUser.id)

      expect(userService.destroy).toBeCalledWith(testUser.id)
    })
  })
})
