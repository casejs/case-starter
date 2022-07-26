import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

// Add all your CRON Tasks here.
@Injectable()
export class TaskService {
  @Cron('30 0 * * *') // Everyday at 00:30.
  myScheduledTask() {
    console.log('This is from the TaskService')
  }
}
