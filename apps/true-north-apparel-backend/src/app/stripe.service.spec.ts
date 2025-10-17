import { StripeService } from './stripe.service';

/**
 * Test suite for StripeService.
 */
describe('StripeService', () => {
  let service: StripeService;


   let configService: import('@nestjs/config').ConfigService;
  /**
   * Setup test dependencies before each test.
   */
  beforeEach(() => {
  configService = { get: () => 'sk_test_dummy' } as unknown as import('@nestjs/config').ConfigService;
     service = new StripeService(configService);
   });

  /**
   * Should instantiate the service.
   */
  it('should be defined', (): void => {
    expect(service).toBeDefined();
  });

  /**
   * Should use stub if key is dummy.
   */
  it('should use stub if key is dummy', (): void => {
    expect((service as any).isStub).toBe(true);
  });

  /**
   * Should return stub session for createCheckoutSession if stub.
   */
  it('should return stub session for createCheckoutSession if stub', async (): Promise<void> => {
    const session = await service.createCheckoutSession({} as unknown as any);
    expect(session.id).toBe('sess_stub_123');
    expect(session.url).toContain('sess_stub_123');
  });

  /**
   * Should throw if not stub and stripe is not initialized.
   */
  it('should throw if not stub and stripe is not initialized', async (): Promise<void> => {
    // Simulate a real key but no Stripe instance
    const realConfig: import('@nestjs/config').ConfigService = { get: () => 'sk_live_real' } as unknown as import('@nestjs/config').ConfigService;
    const realService = new StripeService(realConfig);
    (realService as any).stripe = undefined;
    (realService as any).isStub = false;
    await expect(realService.createCheckoutSession({} as unknown as any)).rejects.toThrow('Stripe client not initialized');
  });
});
