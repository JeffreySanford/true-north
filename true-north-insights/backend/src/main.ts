/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

import { AppModule } from './app/app.module';

async function bootstrap(): Promise<void> {
  const nestApplication = await NestFactory.create(AppModule, {
    logger: false,
  });
  const globalPrefix = 'api';
  nestApplication.setGlobalPrefix(globalPrefix);
  // Swagger / OpenAPI setup
  const config = new DocumentBuilder()
    .setTitle('True North API')
    .setDescription('Core API for True North Insights')
    .setVersion('0.1.0')
    .addTag('root')
    .build();
  const document = SwaggerModule.createDocument(nestApplication, config);
  const docsPath = `${globalPrefix}/docs`;
  SwaggerModule.setup(docsPath, nestApplication, document, {
    customSiteTitle: 'True North API Docs',
  });

  // Persist spec so contracts/api can consume without starting server (CI/codegen)
  try {
    const outDir = resolve(process.cwd(), 'contracts', 'api', 'generated');
    mkdirSync(outDir, { recursive: true });
    writeFileSync(
      resolve(outDir, 'openapi.json'),
      JSON.stringify(document, null, 2)
    );
    Logger.log('OpenAPI spec written to contracts/api/generated/openapi.json');
  } catch (err) {
    Logger.error('Failed to write OpenAPI spec', err as Error);
  }

  if (process.env['GENERATE_OPENAPI']) {
    await nestApplication.close();
    Logger.log('OpenAPI generation mode complete – server not started.');
    return;
  }

  const port = process.env['PORT'] || 3000;
  await nestApplication.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(`📘 Swagger UI: http://localhost:${port}/${docsPath}`);
}

bootstrap();
