import { BillingController } from './billing.controller';
import { StripeService } from './stripe.service';
import { ConfigService } from '@nestjs/config';

/**
 * Test suite for BillingController.
 */
describe('BillingController', () => {
  let controller: BillingController;
  let stripeService: StripeService;
  let configService: ConfigService;

  /**
   * Setup test dependencies before each test.
   */
  beforeEach(() => {
  configService = { get: () => 'sk_test_dummy' } as unknown as ConfigService;
  stripeService = new StripeService(configService);
    controller = new BillingController(stripeService);
  });

  /**
   * Should instantiate the controller.
   */
  it('should be defined', (): void => {
    expect(controller).toBeDefined();
  });

  /**
   * Should create a checkout session and return url.
   */
  it('should create a checkout session and return url', async (): Promise<void> => {
    const mockUrl = 'https://example.com/checkout/abc';
    const mockSession = { url: mockUrl };
  jest.spyOn(stripeService, 'createCheckoutSession').mockResolvedValueOnce(mockSession as any);
    const result = await controller.createCheckout({ priceId: 'price_123' });
    expect(result).toEqual({ url: mockUrl });
    expect(stripeService.createCheckoutSession).toHaveBeenCalledWith(expect.objectContaining({
      line_items: [expect.objectContaining({ price: 'price_123' })]
    }));
  });

  /**
   * Should handle errors from StripeService.
   */
  it('should handle errors from StripeService', async (): Promise<void> => {
    jest.spyOn(stripeService, 'createCheckoutSession').mockRejectedValueOnce(new Error('fail'));
    await expect(controller.createCheckout({ priceId: 'bad' })).rejects.toThrow('fail');
  });
});
