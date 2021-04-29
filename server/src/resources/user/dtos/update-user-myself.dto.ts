import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

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

  @IsNotEmpty()
  @IsString()
  readonly roleId: number | string

  @IsOptional()
  @IsString()
  readonly image: string
}
