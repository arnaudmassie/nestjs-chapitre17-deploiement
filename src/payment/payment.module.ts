import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { StripeModule } from 'src/stripe/stripe.module';
import { AnnounceModule } from 'src/announce/announce.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  // imports: [StripeModule, AnnounceModule],
  imports: [
    StripeModule,
    AnnounceModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('SECRET_TOKEN'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class PaymentModule {}
