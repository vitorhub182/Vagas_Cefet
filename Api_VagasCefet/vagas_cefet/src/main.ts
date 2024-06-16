import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true, // erro para dados no json que não estão no dto
    })
  );
  useContainer(app.select(AppModule), {fallbackOnErrors: true}); // Usar o gestor de dependência do Nest para injetar objetos nas validações customizadas.
  await app.listen(3002);
}
bootstrap();
