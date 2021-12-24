import { Component, OnInit } from '@angular/core';
import { Product } from '../../Product';
import { UserServiceService } from '../../services/user-service.service';
import { FormGroup,FormControl,Validators,FormControlName } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  AllProduct:Product[]=[];
  product:Product[]= [];

  insertProduct:FormGroup = new FormGroup({
    product_name:new FormControl("",[Validators.required]),
    product_price:new FormControl("",[Validators.required]),
    product_discount:new FormControl("",[Validators.required]),
    category:new FormControl("",[Validators.required]),
  });

  get product_name(){
    return this.insertProduct.get("product_name");
  }

  get product_price(){
    return this.insertProduct.get("product_price");
  }

  get product_discount(){
    return this.insertProduct.get("product_discount");
  }

  get category(){
    return this.insertProduct.get("category");
  }

  AddProduct(){
    console.log(this.insertProduct.value);

    this.product.push(this.insertProduct.value);
    

    this.userService.InsertProduct(this.product[0]).subscribe((data:any)=>{
      window.alert(data.message);
      if(data.status){
        this.AllProduct.push(this.product[0]);
        this.product = [];
      }
    });
    
    this.insertProduct.reset();
  }

  constructor(private userService:UserServiceService,) {
    
   }

 

  ngOnInit(): void {

    this.userService.GetProducts().subscribe((data:any)=>{
      this.AllProduct = data.result;
    });

    

  }

  deleteProduct(product:Product)
  {
    if(window.confirm("Are you sure?"))
    {
      this.userService.deleteProduct(product).subscribe((data:any)=>{
        if(data.message){ window.alert(data.message)};
  
        if(data.status){
          this.AllProduct = this.AllProduct.filter((p)=>{
            return p._id!==product._id
          });
        }
      });
    }
  }

  editProduct(product:Product)
  {
    console.log(product._id);
  }

  

}
