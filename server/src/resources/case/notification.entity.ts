import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { User } from '../user/user.entity'
import { UserLite } from './user-lite.entity'

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  description: string

  @Column({ nullable: true })
  linkPath: string

  @Column({ type: 'timestamp' })
  date: Date

  @ManyToOne((type) => UserLite, (user) => user.notifications, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  user: User

  @CreateDateColumn({ select: false })
  createdAt: Date

  @UpdateDateColumn({ select: false })
  updatedAt: Date

  // Calculated
  isHighlighted: boolean
}
