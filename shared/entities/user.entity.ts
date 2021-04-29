import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from '../../server/node_modules/typeorm'

import { Notification } from './notification.entity'
import { Role } from './role.entity'

import { AbacusUser } from '../../server/node_modules/@case-app/nest-library'

@Entity({ name: 'users' })
@Unique(['email'])
export class User implements AbacusUser {
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

  imageObjects: { label?: string; link?: string; image?: string }[]

  @AfterLoad()
  public async afterLoad() {
    this.imageObjects = [
      {
        label: this.name,
        image: this.image,
      },
    ]
  }
}
