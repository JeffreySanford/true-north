import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import type { ProductDTO } from '@true-north-apparel/shared/api-interfaces';

/**
 *
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('products')
  products(): Observable<ProductDTO[]> {
    return this.appService.products();
  }
}
