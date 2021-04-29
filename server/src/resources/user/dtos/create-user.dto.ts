import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Validate,
  IsOptional
} from 'class-validator'
import { IsUserAlreadyExist } from '@case-app/nest-library'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @IsNotEmpty()
  @IsEmail()
  @Validate(IsUserAlreadyExist)
  readonly email: string

  @IsNotEmpty()
  @IsString()
  readonly password: string

  @IsNotEmpty()
  readonly roleId: number | string

  @IsOptional()
  readonly isActive: boolean

  @IsOptional()
  @IsString()
  readonly image: string
}
