import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Documentación de la API para el equipo frontend.')
    .setVersion('1.0')
    .addTag('Endpoints') // Puedes agregar tags para agrupar endpoints
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // La documentación estará disponible en /api

  // Habilitar CORS si es necesario
  app.enableCors();

  await app.listen(3000);
}
bootstrap().catch((err) => console.error(err));
