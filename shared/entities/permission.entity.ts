import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from '../../server/node_modules/typeorm'

import { Role } from './role.entity'
import { AbacusPermission } from '../../server/node_modules/abacus-nest-library'

@Entity({ name: 'permissions' })
export class Permission implements AbacusPermission {
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
