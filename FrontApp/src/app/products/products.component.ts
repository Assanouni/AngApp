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

  DeleteProduct(p:any){
    let index = this.products.indexOf(p);
    this.products.splice(index,1);
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
}
