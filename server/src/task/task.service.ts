import { Injectable } from '@nestjs/common'
import { Cron, NestSchedule } from 'nest-schedule'

// Add all your CRON Tasks here.
@Injectable()
export class TaskService extends NestSchedule {
  constructor() {
    super()
  }

  @Cron('30 0 * * *') // Everyday at 00:30.
  myScheduledTask() {
    console.log('This is from the TaskService')
  }
}
