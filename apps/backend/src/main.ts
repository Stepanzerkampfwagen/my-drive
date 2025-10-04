import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
  })

  app.use('/uploads', express.static('uploads'))

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
