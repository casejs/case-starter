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

import { Notification } from './notification.entity'
import { Role } from './role.entity'

// * UserLite is an abstraction of a User removing its custom relations (but keeping CASE relations like Role or Notification).
// * This is needed in order to pass this entity to the NestLibrary without having to send the whole DB.
@Entity({ name: 'users' })
@Unique(['email'])
export class UserLite implements CaseUser {
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
