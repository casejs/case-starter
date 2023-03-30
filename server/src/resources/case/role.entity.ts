import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { Permission } from './permission.entity'
import { User } from '../user/user.entity'

import { CaseRole } from '@casejs/nest-library'
import { UserLite } from './user-lite.entity'

@Entity({ name: 'roles' })
export class Role implements CaseRole {
  public static searchableFields: string[] = ['name']
  public static displayName: string = 'name'

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  displayName: string

  @Column({ nullable: true })
  homepagePath: string

  @ManyToMany((type) => Permission, (p) => p.roles)
  permissions: Permission[]

  @OneToMany((type) => UserLite, (u) => u.role)
  users: User[]

  @CreateDateColumn({ select: false })
  createdAt: Date

  @UpdateDateColumn({ select: false })
  updatedAt: Date
}
