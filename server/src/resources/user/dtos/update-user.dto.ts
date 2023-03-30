import { toNumber } from '@casejs/nest-library'
import { Transform } from 'class-transformer'
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEmail,
  IsOptional
} from 'class-validator'

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsOptional()
  @IsString()
  readonly password: string

  @Transform(({ value }) => toNumber(value))
  @IsNotEmpty()
  @IsNumber()
  readonly roleId: number

  @IsOptional()
  @IsString()
  readonly image: string

  @IsOptional()
  readonly isActive: boolean
}
