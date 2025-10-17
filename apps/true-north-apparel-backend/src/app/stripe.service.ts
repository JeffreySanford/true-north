import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

/**
 *
 */
@Injectable()
export class StripeService {
  private stripe?: Stripe;
  private isStub = false;

  constructor(private config: ConfigService) {
  const key = this.config.get<string>('STRIPE_SECRET_KEY') ?? '';
  const safeKey = typeof key === 'string' && key.length > 0 ? key : '';
    // If developer is using the placeholder key, use a local stub to avoid network calls
    if (!safeKey || safeKey.startsWith('sk_test_placeholder') || safeKey === 'sk_test_dummy') {
      this.isStub = true;
    } else {
      this.stripe = new Stripe(safeKey, {
        // align with installed Stripe types
        apiVersion: '2025-09-30.clover',
      });
    }
  }

  async createCheckoutSession(params: Stripe.Checkout.SessionCreateParams): Promise<Stripe.Checkout.Session> {
    if (this.isStub) {
      // Return a fake session shape compatible with how the app uses it
      return {
        id: 'sess_stub_123',
        url: 'https://example.com/checkout/sess_stub_123',
      } as unknown as Stripe.Checkout.Session;
    }

    if (!this.stripe) {
      throw new Error('Stripe client not initialized');
    }
    return await this.stripe.checkout.sessions.create(params);
  }

  // Add more Stripe API methods as needed
}
