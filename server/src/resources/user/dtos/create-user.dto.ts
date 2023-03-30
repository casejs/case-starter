import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEmail,
  Validate,
  IsOptional
} from 'class-validator'
import { IsUserAlreadyExist, toNumber } from '@casejs/nest-library'
import { Transform } from 'class-transformer'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  @IsString()
  readonly password: string

  @Transform(({ value }) => toNumber(value))
  @IsNotEmpty()
  @IsNumber()
  readonly roleId: number

  @IsOptional()
  readonly isActive: boolean

  @IsOptional()
  @IsString()
  readonly image: string
}
