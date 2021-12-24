import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { Product } from '../../Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private userService:UserServiceService) { }

  AllProduct:Product[] = [];


  ngOnInit(): void {
    this.userService.GetProducts().subscribe((data:any)=>{
      if(data.status){
        this.AllProduct = data.result;
        console.log(this.AllProduct);
      }else{

      }
    });
  }



}
