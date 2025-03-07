import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { StripeModule } from 'src/stripe/stripe.module';
import { AnnounceModule } from 'src/announce/announce.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [StripeModule, AnnounceModule],
})
export class PaymentModule {}
