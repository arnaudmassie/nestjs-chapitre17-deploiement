import { Module } from '@nestjs/common';
import { AnnounceController } from './announce.controller';
import { AnnounceService } from './announce.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnounceEntity } from './entities/announce.entity';
import { LevelModule } from 'src/level/level.module';
import { SubjectModule } from 'src/subject/subject.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnnounceEntity]),
    LevelModule,
    SubjectModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('SECRET_TOKEN'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AnnounceController],
  providers: [AnnounceService],
  exports: [AnnounceService],
})
export class AnnounceModule {}
