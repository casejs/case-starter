import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator'

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

  @IsNotEmpty()
  readonly roleId: number | string

  @IsOptional()
  @IsString()
  readonly image: string

  @IsOptional()
  readonly isActive: boolean
}
