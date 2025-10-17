import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import type { ShirtProductDTO } from '@true-north-apparel/shared/api-interfaces';

/**
 *
 */
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  standalone: false
})
/**
 * ShopComponent displays all available products and the featured product.
 */
export class ShopComponent {
  /**
   * Observable holding all available products for the shop.
   * @type {BehaviorSubject<ShirtProductDTO[]>}
   */
  private readonly products$: BehaviorSubject<ShirtProductDTO[]> = new BehaviorSubject<ShirtProductDTO[]>([
    { id:'1', sku:'BET-USA-001', name:'Bet on America', priceCents: 2999, active:true, brand:'Legendary True North', material:'Premium Cotton', fit:'Classic', type:'Tee', color:'Navy' },
    { id:'2', sku:'MERIT-001', name:'#MERIT Matters', priceCents: 2999, active:true, brand:'Legendary True North', material:'Organic Blend', fit:'Slim', type:'Tee', color:'White' },
    { id:'3', sku:'LEG-001', name:'Moose on the Loose', priceCents: 2499, active:true, brand:'Legendary True North', material:'Premium Cotton', fit:'Relaxed', type:'Long Sleeve', color:'Forest Green' },
    { id:'4', sku:'LEG-002', name:'Maple Syrup MVP', priceCents: 2599, active:true, brand:'Legendary True North', material:'Performance Poly', fit:'Classic', type:'Tee', color:'Red' },
    { id:'5', sku:'LEG-003', name:'Poutine Power', priceCents: 2699, active:true, brand:'Legendary True North', material:'Organic Blend', fit:'Slim', type:'Hoodie', color:'Charcoal' },
    { id:'6', sku:'LEG-004', name:'Beavers Build Dreams', priceCents: 2399, active:true, brand:'Legendary True North', material:'Premium Cotton', fit:'Classic', type:'Tee', color:'Brown' },
    { id:'7', sku:'LEG-005', name:'Snow Angel CEO', priceCents: 2799, active:true, brand:'Legendary True North', material:'Performance Poly', fit:'Relaxed', type:'Long Sleeve', color:'Ice Blue' },
    { id:'8', sku:'LEG-006', name:'Igloo Innovator', priceCents: 2899, active:true, brand:'Legendary True North', material:'Premium Cotton', fit:'Slim', type:'Tee', color:'Grey' },
    { id:'9', sku:'LEG-007', name:'Lumberjack Wisdom', priceCents: 2999, active:true, brand:'Legendary True North', material:'Organic Blend', fit:'Classic', type:'Hoodie', color:'Plaid' },
    { id:'10', sku:'LEG-008', name:'Polar Bear Positivity', priceCents: 2599, active:true, brand:'Legendary True North', material:'Performance Poly', fit:'Slim', type:'Tee', color:'White' },
    { id:'11', sku:'LEG-009', name:'Hockey Hugs Only', priceCents: 2699, active:true, brand:'Legendary True North', material:'Premium Cotton', fit:'Classic', type:'Long Sleeve', color:'Royal Blue' },
    { id:'12', sku:'LEG-010', name:'Moose-tivational Speaker', priceCents: 2499, active:true, brand:'Legendary True North', material:'Premium Cotton', fit:'Classic', type:'Long Sleeve', color:'Vibrant Violet' }
  ] as ShirtProductDTO[]);

  /**
   * Get all products (for template use)
   * @returns {ShirtProductDTO[]} Array of all products
   */
  get products(): ShirtProductDTO[] {
    return this.products$.getValue();
  }

  /**
   * Get the featured product (first active)
   * @returns {ShirtProductDTO | undefined} The first active product, or undefined if none
   */
  get featuredProduct(): ShirtProductDTO | undefined {
    return this.products.find((p: ShirtProductDTO) => Boolean(p.active));
  }
}
