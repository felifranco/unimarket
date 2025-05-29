import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
//import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
//import { JwtStrategy } from 'src/strategies/jwt.strategy';
//import { JwtRefreshStrategy } from 'src/strategies/jwt-refresh.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    /*JwtModule.register({
      global: true,
      secret: 'kuDrl&r0sug7zAy0pi70',
      signOptions: {
        expiresIn: '100m',
      },
    }),*/
  ],
  controllers: [AuthController],
  providers: [AuthService /* , JwtStrategy, JwtRefreshStrategy */],
  exports: [AuthService],
})
export class AuthModule {}
