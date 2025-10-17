
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BillingController } from './billing.controller';
import { AppService } from './app.service';
import { StripeService } from './stripe.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 *
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env.development',
        '.env.production',
        '.env'
      ],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const configured = config.get<string>('MONGO_URI');
        if (typeof configured === 'string' && configured.length > 0) {
          return { uri: configured };
        }

        // If no MONGO_URI configured and we're in development, start an in-memory server
        const envValue = config.get<string>('NODE_ENV');
        const nodeEnv = typeof envValue === 'string' && envValue.length > 0
          ? envValue
          : (typeof process.env.NODE_ENV === 'string' && process.env.NODE_ENV.length > 0 ? process.env.NODE_ENV : 'development');
        if (nodeEnv === 'development') {
          // Lazy import to avoid adding to production bundle
          let MongoMemoryServer: any;
          try {
            MongoMemoryServer = (await import('mongodb-memory-server')).MongoMemoryServer;
          } catch (e) {
            throw new Error('mongodb-memory-server is required for development but not installed.');
          }
          const mongod = await MongoMemoryServer.create();
          const uri = mongod.getUri();
          console.log('[MONGO] Started in-memory mongo for development at', uri);
          return { uri };
        }

        return { uri: 'mongodb://localhost:27017/true-north-apparel' };
      },
    }),
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [AppController, BillingController, ProductController],
  providers: [AppService, StripeService, ProductService],
})
export class AppModule {}
