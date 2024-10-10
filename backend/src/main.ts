import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 8787;

  app.enableCors({
    origin: [process.env.FRONTEND_URL, process.env.DEPLOYMENT_URL_REGEX],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(port);

  Logger.log(`Application is running on http://localhost:${port}`, 'Speed');
}
bootstrap();
