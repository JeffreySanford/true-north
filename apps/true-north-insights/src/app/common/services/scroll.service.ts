import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  scrollPosition$: any;

  constructor() { 
    console.log('ScrollService is active');
  }
}
