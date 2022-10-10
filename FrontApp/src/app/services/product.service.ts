import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { off } from 'process';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products! : Array<Product>;

  constructor() { 
    this.products = [
      {id : UUID.UUID(), label : "Computer", price : 6500, isPromotion : false},
      {id : UUID.UUID(), label : "Souris", price : 100 , isPromotion : true},
      {id : UUID.UUID(), label : "Ecran", price : 2000 , isPromotion : true}
    ];

    for (let index = 0; index < 5; index++) {
      this.products.push({id : UUID.UUID(), label : "Computer_"+index, price : 6500, isPromotion : false});
      this.products.push({id : UUID.UUID(), label : "Souris_"+index, price : 6500, isPromotion : false});
      this.products.push({id : UUID.UUID(), label : "Ecran_"+index, price : 6500, isPromotion : false});
      
    }
  }

  getAllProducts() : Observable<Array<Product>>{
    return of(this.products)
  }

  deleteProduct(pID:string) : Observable<boolean>{
  this.products = this.products.filter(p=>p.id != pID)
      return of(true);
  }

  PromoteProduct(pID : string) : Observable<boolean>{
    let prdt = this.products.find(p=>p.id == pID);

    if(prdt != undefined){
       prdt.isPromotion = !prdt.isPromotion 
      return  of(true);
    }else
      return throwError(()=>new Error("Product not found"));
  }

  SearchByLabel(word : any,size : number , page : number) : Observable<PageProduct>{

    let prods = this.products.filter(p=> p.label.toLocaleLowerCase().includes(word.toLocaleLowerCase()));
    let index = page*size;
    let pages = ~~(prods.length / size);

    if(prods.length % size != 0 ) 
      pages++;
  
  return of({products : prods.slice(index,size + index),pageIndex : page,pageSize : size,totalPages : pages });
  }

  GetPageProducts(size :number,pageNumber:number):Observable<PageProduct>{
    let index = pageNumber*size;
    let pages = ~~(this.products.length / size);

    if(this.products.length % size != 0 ) 
      pages++;
  
  return of({products : this.products.slice(index,size + index),pageIndex : pageNumber,pageSize : size,totalPages : pages });
  }
}
