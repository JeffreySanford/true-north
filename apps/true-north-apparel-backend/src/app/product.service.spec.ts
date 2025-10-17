import { ProductService } from './product.service';

/**
 * Test suite for ProductService.
 */
describe('ProductService', () => {
  let service: ProductService;
  let mockModel: any;

  /**
   * Setup test dependencies before each test.
   */
  beforeEach(() => {
    mockModel = {
      find: jest.fn().mockReturnThis(),
      findById: jest.fn().mockReturnThis(),
      lean: jest.fn(),
      countDocuments: jest.fn(),
      create: jest.fn()
    };
  service = new ProductService(mockModel as any);
  });

  /**
   * Should instantiate the service.
   */
  it('should be defined', (): void => {
    expect(service).toBeDefined();
  });

  /**
   * onModuleInit: Should seed data if collection is empty.
   */
  describe('onModuleInit', () => {
    /**
     * Should seed data if collection is empty.
     */
    it('should seed data if collection is empty', async (): Promise<void> => {
      mockModel.countDocuments.mockResolvedValue(0);
      mockModel.create.mockResolvedValue([]);
      await service.onModuleInit();
      expect(mockModel.create).toHaveBeenCalled();
    });

    /**
     * Should not seed data if collection is not empty.
     */
    it('should not seed data if collection is not empty', async (): Promise<void> => {
      mockModel.countDocuments.mockResolvedValue(2);
      await service.onModuleInit();
      expect(mockModel.create).not.toHaveBeenCalled();
    });
  });

  /**
   * findAll: Should return all products.
   */
  describe('findAll', () => {
    /**
     * Should return all products.
     */
    it('should return all products', async (): Promise<void> => {
      const products = [{ name: 'A' }];
      mockModel.find.mockReturnThis();
      mockModel.lean.mockResolvedValue(products);
      const result = await service.findAll();
      expect(result).toBe(products);
      expect(mockModel.find).toHaveBeenCalled();
      expect(mockModel.lean).toHaveBeenCalled();
    });
  });

  /**
   * findById: Should return product by id.
   */
  describe('findById', () => {
    /**
     * Should return product by id.
     */
    it('should return product by id', async (): Promise<void> => {
      const product = { name: 'B' };
      mockModel.findById.mockReturnThis();
      mockModel.lean.mockResolvedValue(product);
      const result = await service.findById('id123');
      expect(result).toBe(product);
      expect(mockModel.findById).toHaveBeenCalledWith('id123');
      expect(mockModel.lean).toHaveBeenCalled();
    });
  });
});
