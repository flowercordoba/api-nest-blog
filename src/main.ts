import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './shared/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(envs.PORT);
  console.log('api corriendo en el puerto', envs.PORT)
}
bootstrap();

