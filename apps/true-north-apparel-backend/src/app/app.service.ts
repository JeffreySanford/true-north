
import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import type { ProductDTO } from '@true-north-apparel/shared/api-interfaces';

/**
 *
 */
@Injectable()
export class AppService {
  products(): Observable<ProductDTO[]> {
    return of([
      { id:'1', sku:'BET-USA-001', name:'Bet on America', priceCents: 2999, active:true },
      { id:'2', sku:'MERIT-001', name:'#MERIT Matters', priceCents: 2999, active:true }
    ]);
  }
}
