import { Controller, Headers, Post, RawBodyRequest, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  // Ici on renvoie à stripe un booléen indiquant si oui ou non le webhook a bien été traité
  // Dans le cas d'absence de réponse ou de 404, Stripe renverra le webhook non traité plus tard, à des intervalles de plus en plus longs à chaque fois
  // On récupère dans la requête le body au format raw (non parsé par Nest), d'où l'option rawBody ajoutée dans le main.ts
  @Post('webhook')
  async handleIncomingEvents(
    @Headers('stripe-signature') signature: string,
    // @Req() req: RawBodyRequest<Request>,
    @Req() req: Buffer,
  ): Promise<boolean> {
    return this.stripeService.handleIncomingEvents(signature, req);
  }
}
