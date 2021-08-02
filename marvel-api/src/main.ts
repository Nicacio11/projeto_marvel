import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = app.get(ConfigService);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*' });
  await app.listen(config.get('PORT'));
  Logger.log(`HTTP app running in port: ${config.get('PORT')}`);
}
bootstrap();
