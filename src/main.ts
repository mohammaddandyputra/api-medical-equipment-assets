import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: '*',
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('MEDICAL EQUIPMENT ASSET')
    .setDescription('The Medical Equipment Asset API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(3000);
}
bootstrap();
