import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubjectModule } from './subject/subject.module';
import { LevelModule } from './level/level.module';
// import { BddModule } from './bdd/bdd.module';
// import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectEntity } from './subject/entities/subject.entity';
import { LevelEntity } from './level/entities/level.entity';
import { typeOrmModuleOptions } from './ormconfig';
import { CacheModule } from '@nestjs/cache-manager';
import { AnnounceModule } from './announce/announce.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { StripeModule } from './stripe/stripe.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  // imports: [SubjectModule, LevelModule, BddModule, ConfigModule],
  imports: [
    SubjectModule,
    LevelModule,
    // BddModule,
    // ConfigModule.register({
    // ConfigModule.forRoot({
    //   folder: './config',
    // }),
    // TypeOrmModule.forRoot({
    //   type: 'mariadb',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'mentor',
    //   entities: [SubjectEntity, LevelEntity],
    //   synchronize: true,
    // }),
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    ConfigModule.forRoot({
      envFilePath: './config/.env',
      isGlobal: true,
    }),
    CacheModule.register(),
    AnnounceModule,
    UserModule,
    AuthModule,
    CourseModule,
    StripeModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
