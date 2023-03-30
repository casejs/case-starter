import { toNumber } from '@casejs/nest-library'
import { Transform } from 'class-transformer'
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber
} from 'class-validator'

export class UpdateUserMyselfDto {
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
}
