
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { setupSwagger } from './swagger';

/**
 *
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: ['log','error','warn'] });
  app.enableCors();
  setupSwagger(app);
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port);
  console.log(`True North Apparel API listening on http://localhost:${port}`);
}
bootstrap();
