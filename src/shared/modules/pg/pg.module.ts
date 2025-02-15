import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { Blog } from 'src/blog/entities/blog.entity';
import { envs } from 'src/shared/envs';
import { CryptoPrice } from 'src/websocket/realtime/entity/price.entity';


@Global()
@Module({
  imports:[
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.DATABASE_HOST,
      port: 5432,
      username: envs.DATABASE_USERNAME,
      password: envs.DATABASE_PASSWORD,
      database: envs.DATABASE_NAME,
      entities: [Auth,Blog,CryptoPrice],
      synchronize: true,
      ssl:true
    }),
 
  ],
  exports: [TypeOrmModule], 

})
export class PgModule {
 
}