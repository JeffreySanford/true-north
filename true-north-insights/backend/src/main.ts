/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap(): Promise<void> {
  const nestApplication = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  nestApplication.setGlobalPrefix(globalPrefix);
  const port = process.env['PORT'] || 3000;
  await nestApplication.listen(port);
  Logger.log(
    `��� Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
