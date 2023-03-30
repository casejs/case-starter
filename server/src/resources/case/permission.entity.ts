import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm'

import { Role } from './role.entity'
import { CasePermission } from '@casejs/nest-library'

@Entity({ name: 'permissions' })
export class Permission implements CasePermission {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany((type) => Role, (r) => r.permissions, { cascade: true })
  @JoinTable({ name: 'permission_role' })
  roles: Role[]

  @CreateDateColumn({ select: false })
  createdAt: Date

  @UpdateDateColumn({ select: false })
  updatedAt: Date
}
