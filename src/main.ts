import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, 'localhost');
  const url = await app.getUrl();
  console.log(`let's drink, let's have fun!, ${url}`);
}
bootstrap();
