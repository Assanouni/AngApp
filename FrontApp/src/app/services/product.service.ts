import { Injectable } from '@angular/core';
import { off } from 'process';
import { Observable, of } from 'rxjs';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products! : Array<Product>;

  constructor() { 
    this.products = [
      {id : 1, label : "Computer", price : 6500},
      {id : 2, label : "Souris", price : 100},
      {id : 3, label : "Ecran", price : 2000}
    ];
  }

  getAllProducts() : Observable<Array<Product>>{
    return of(this.products)
  }
}
