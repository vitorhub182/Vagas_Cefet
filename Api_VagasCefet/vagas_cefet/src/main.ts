import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true, // erro para dados no json que não estão no dto
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Vagas Cefet')
    .setDescription('API de gerenciamento das vagas internas do Cefet!')
    .setVersion('1.0')
    .addTag('vagasCefet')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  useContainer(app.select(AppModule), {fallbackOnErrors: true}); // Usar o gestor de dependência do Nest para injetar objetos nas validações customizadas.
  await app.listen(3002);
}
bootstrap();
