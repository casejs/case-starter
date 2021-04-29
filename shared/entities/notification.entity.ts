import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from '../../server/node_modules/typeorm'

import { User } from './user.entity'

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

  @ManyToOne((type) => User, (user) => user.notifications, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User

  @CreateDateColumn({ select: false })
  createdAt: Date

  @UpdateDateColumn({ select: false })
  updatedAt: Date

  // Calculated
  isHighlighted: boolean
}
