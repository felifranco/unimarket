import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import configurations from './config/configurations';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configurations], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USER', 'postgres'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_DATABASE', 'postgres'),
        entities: [User],
        synchronize: true,
        //ssl: true,
        //extra: {
        //  ssl: {
        //    rejectUnauthorized: false,
        //  },
        //},
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
