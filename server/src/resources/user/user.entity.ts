import { CaseUser } from '@casejs/nest-library'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'

import { Notification } from '../case/notification.entity'
import { Role } from '../case/role.entity'

@Entity({ name: 'users' })
@Unique(['email'])
export class User implements CaseUser {
  public static searchableFields: string[] = ['name', 'email']
  public static displayName: string = 'name'

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column({ default: '#828282' })
  color: string

  @Column({ nullable: true })
  image: string

  @Column({ select: false })
  password: string

  @Column({ select: false })
  token: string

  @Column('timestamp', { nullable: true, select: false })
  lastNotificationCheck: Date

  @Column('tinyint', { default: true })
  isActive: boolean

  @Column('tinyint', { default: false, select: false })
  isGhost: boolean

  // Relations.
  @OneToMany((type) => Notification, (n) => n.user)
  notifications: Notification[]

  @ManyToOne((type) => Role, (r) => r.users)
  role: Role

  // Auto.
  @CreateDateColumn({ select: false })
  createdAt: Date

  @UpdateDateColumn({ select: false })
  updatedAt: Date
}
