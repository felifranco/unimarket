import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { ConfigModule } from '@nestjs/config';
//import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
//import configurations from './config/configurations';
import { Auth } from './auth/entities/auth.entity';

@Module({
  imports: [
    //ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.17.0.3',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      entities: [Auth],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
