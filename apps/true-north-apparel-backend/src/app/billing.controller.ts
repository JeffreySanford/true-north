import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';

/**
 *
 */
@Controller('billing')
export class BillingController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('checkout')
  async createCheckout(@Body() body: { priceId: string }): Promise<{ url: string }> {
    const session = await this.stripeService.createCheckoutSession({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price: body.priceId,
          quantity: 1,
        },
      ],
      success_url: 'https://yourdomain.com/success',
      cancel_url: 'https://yourdomain.com/cancel',
    });
  if (!session.url) throw new Error('Stripe session did not return a URL');
  return { url: session.url };
  }
}
