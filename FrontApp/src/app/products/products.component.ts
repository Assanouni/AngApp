import { Component, OnInit } from '@angular/core';
import { Product } from '../model/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products! : Array<Product>;
  ErrorMessage : any;

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
   this.getAllProducts();
  }

  DeleteProduct(p:Product){
    
    if(confirm("Are you sure you wana delete it ?"))
      this.productService.deleteProduct(p.id).subscribe(
        {
          next : ()=> this.products.splice(this.products.indexOf(p),1)
          ,error : (error)=>{
            this.ErrorMessage = error;
          },complete : ()=>{
            console.log("Completed")
          }
        }
    )
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(
      {
        next : (data:Product[])=> {
          this.products = data
        },error : (error)=> {
          this.ErrorMessage = error
        },complete :()=>{
            console.log("completed")
        }
      }
    )
  }

  PromotProduct(prd : Product ){
    let promo = prd.isPromotion;
    this.productService.PromoteProduct(prd.id).subscribe(
      {
        next : ()=> prd.isPromotion = !promo,
        error : (error)=> this.ErrorMessage = error,
        complete : ()=> console.log("Completed")
      }
    )
  }
}
