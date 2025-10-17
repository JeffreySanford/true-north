import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

/**
 *
 */
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(): Promise<unknown> {
    return await this.productService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<unknown> {
    return await this.productService.findById(id);
  }
}
