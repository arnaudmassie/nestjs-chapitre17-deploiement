import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule, {
    // Note cours écrit (leçon 71. La création de Course)
    // La première étape est de modifier le main.ts, afin de permettre à notre explication d'exposer le rawBody d'une requête.
    // Le rawBody dans une requête sur NestJS fait référence au corps brut (non transformé) de la requête HTTP, tel qu'il a été reçu avant tout traitement ou parsing (comme la transformation en JSON ou en URL-encoded).
    // Il est souvent utilisé lorsque l'on travaille avec des services comme Stripe, où l'on doit valider la signature d'un webhook en utilisant le corps brut de la requête pour garantir l'intégrité des données et la sécurité.
    // En d'autres termes, le rawBody permet de récupérer les données exactes envoyées dans la requête, sans modification.
    rawBody: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  // await app.listen(process.env.PORT ?? 3000);
  await app.listen(port);
}
bootstrap();
