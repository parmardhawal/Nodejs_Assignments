import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  username:string = "";

  user:User[]=[];

  constructor(private userService:UserServiceService,private cookieService:CookieService,private router:Router) { }

  ngOnInit(): void {
    // if(!this.cookieService.check("jwt_token"))
    // {
    //   this.router.navigate(["/login"]);
    // }

    // this.userService.verifiedUser().subscribe((res:any)=>{
      
    //   if(!res.status){
    //     window.alert(res.message);
    //     this.router.navigate(["/login"]);
    //   }
    // });

  }

  

}
