import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from '../../server/node_modules/typeorm'

import { Permission } from './permission.entity'
import { User } from './user.entity'

import { AbacusRole } from '../../server/node_modules/abacus-nest-library'

@Entity({ name: 'roles' })
export class Role implements AbacusRole {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  displayName: string

  @ManyToMany((type) => Permission, (p) => p.roles)
  permissions: Permission[]

  @OneToMany((type) => User, (u) => u.role)
  users: User[]

  @CreateDateColumn({ select: false })
  createdAt: Date

  @UpdateDateColumn({ select: false })
  updatedAt: Date
}
