import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AnnounceService } from 'src/announce/announce.service';
import { StripeService } from 'src/stripe/stripe.service';
import { CreatePaymentType } from './interface/payment';

@Injectable()
export class PaymentService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly announceService: AnnounceService,
  ) {}

  private async calculateAmount({
    announceId,
    hours,
  }: CreatePaymentType): Promise<number> {
    const announce = await this.announceService.findOneById(announceId);
    if (!announce) {
      throw new HttpException('announce not found', HttpStatus.NOT_FOUND);
    }
    return announce.price * 100 * hours;
  }

  public async createPayment(
    createPaymentParameters: CreatePaymentType,
    userId: number,
    //   ): Promise<string> {
  ): Promise<{ client_secret: string }> {
    const amount = await this.calculateAmount(createPaymentParameters);
    const paymentIntent = await this.stripeService.paymentIntentCreate({
      amount,
      currency: 'eur',
      metadata: {
        announceId: createPaymentParameters.announceId,
        hours: createPaymentParameters.hours,
        // date: createPaymentParameters.date.toISOString(),
        date: createPaymentParameters.date.toString(),
        userId,
      },
    });

    // return paymentIntent.client_secret!;
    return {
      client_secret: paymentIntent.client_secret!,
    };
  }
}
