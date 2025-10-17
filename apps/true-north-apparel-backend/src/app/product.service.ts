import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';

/**
 *
 */
@Injectable()
export class ProductService implements OnModuleInit {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async onModuleInit(): Promise<void> {
    // Seed mock data if collection is empty
    if ((await this.productModel.countDocuments()) === 0) {
      await this.productModel.create([
        {
          name: 'Northbound Tee',
          description: 'Soft organic cotton, bold compass design.',
          price: 29.99,
          imageUrl: '/assets/brand/logo-placeholder.png',
          stripePriceId: 'price_12345',
        },
        {
          name: 'Explorer Hoodie',
          description: 'Warm, durable, adventure-ready.',
          price: 59.99,
          imageUrl: '/assets/brand/logo-placeholder.png',
          stripePriceId: 'price_67890',
        }
      ]);
    }
  }

  async findAll(): Promise<unknown> {
    return this.productModel.find().lean();
  }

  async findById(id: string): Promise<unknown> {
    return this.productModel.findById(id).lean();
  }
}
