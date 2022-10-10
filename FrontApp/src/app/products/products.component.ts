import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  searchModel! : FormGroup;
  pageSize : number = 5;
  currentPage : number = 0;
  totalPages : number = 10;

  constructor(private productService : ProductService, private fb:FormBuilder) { }

  ngOnInit(): void {
   this. GetAllPages();
   this.searchModel = this.fb.group({
    keyword : this.fb.control(null)
   })
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

  HandleSearch(){
    this.productService.SearchByLabel(this.searchModel.value.keyword,this.pageSize,this.currentPage).subscribe(
      {
        next : (data)=> 
        {
          this.products = data.products,
          this.totalPages = data.totalPages,
          this.currentPage = data.pageIndex
        },
        error :(error)=> console.log(error)
      }
    )
  }

  GetAllPages(){
    this.productService.GetPageProducts(this.pageSize,this.currentPage).subscribe(
      {
        next : (data)=>{
          console.log(data);
          this.products = data.products,
          this.totalPages = data.totalPages,
          this.currentPage = data.pageIndex
        },
        error : (error)=> console.log(error)
      }
    )
  }
  GotoPage(index:number){
    this.currentPage = index;
    this.HandleSearch();
    
  }
}
