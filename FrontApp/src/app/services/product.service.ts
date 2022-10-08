import { Injectable } from '@angular/core';
import { off } from 'process';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products! : Array<Product>;

  constructor() { 
    this.products = [
      {id : 1, label : "Computer", price : 6500, isPromotion : false},
      {id : 2, label : "Souris", price : 100 , isPromotion : true},
      {id : 3, label : "Ecran", price : 2000 , isPromotion : true}
    ];
  }

  getAllProducts() : Observable<Array<Product>>{
    return of(this.products)
  }

  deleteProduct(pID:number) : Observable<boolean>{
  this.products = this.products.filter(p=>p.id != pID)
      return of(true);
  }

  PromoteProduct(pID : number) : Observable<boolean>{
    let prdt = this.products.find(p=>p.id == pID);

    if(prdt != undefined){
       prdt.isPromotion = !prdt.isPromotion 
      return  of(true);
    }else
      return throwError(()=>new Error("Product not found"));
  }
}
