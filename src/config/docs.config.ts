import { DocumentBuilder } from '@nestjs/swagger';

const docs = new DocumentBuilder()
  .setTitle('Nest API Boilerplate')
  .setDescription('API Documentation for Nest API Boilerplate')
  .setVersion('1.0.0')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
    'accessToken',
  )
  .build();

export { docs };
