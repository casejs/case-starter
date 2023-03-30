require('dotenv').config()

import { BugsnagLoggerService } from '@casejs/nest-library'
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as compression from 'compression'
import * as express from 'express'
import { useContainer } from 'typeorm'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.ENABLE_BUGSNAG === 'true'
        ? new BugsnagLoggerService()
        : new Logger()
  })

  // Those settings fix CORS blockage on large requests
  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false
  })

  app.use(compression())

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  )

  app.use(express.static('public'))
  useContainer(app.select(AppModule), {
    fallbackOnErrors: true
  })

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
