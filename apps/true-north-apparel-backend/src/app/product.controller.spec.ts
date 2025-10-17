import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(() => {
    service = {
      findAll: jest.fn(),
      findById: jest.fn()
  } as unknown as ProductService;
    controller = new ProductController(service);
  });

  it('should be defined', (): void => {
    expect(controller).toBeDefined();
  });

  it('should return all products', async (): Promise<void> => {
    const products = [{ name: 'A' }];
    (service.findAll as jest.Mock).mockResolvedValueOnce(products);
    const result = await controller.getAll();
    expect(result).toBe(products);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return product by id', async (): Promise<void> => {
    const product = { name: 'B' };
    (service.findById as jest.Mock).mockResolvedValueOnce(product);
    const result = await controller.getById('id123');
    expect(result).toBe(product);
    expect(service.findById).toHaveBeenCalledWith('id123');
  });

  it('should return null if product not found', async (): Promise<void> => {
    (service.findById as jest.Mock).mockResolvedValueOnce(null);
    const result = await controller.getById('notfound');
    expect(result).toBeNull();
  });
});
