import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../User';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(3)])
  });

  user:User[] =[];

  constructor(private userService:UserServiceService,private router:Router,private cookieService:CookieService) { }

  ngOnInit(): void {
  }

  userLogin(){

    console.log(this.loginForm.value);
    this.user = this.loginForm.value;
    this.userService.loginUser(this.user).subscribe((res:any)=>{
      console.log(res);

      if(res.message!==undefined) window.alert(res.message);

      // this.cookieService.set("jwt_token",res.token);

      // if(res.status!==undefined && res.status)
      // {
      //   this.loginForm.reset();
      //   this.router.navigate(["/home"]);
      // }

      localStorage.setItem("auth_token",res.token);

      //  this.router.navigate(["/home"]);

    });
  }

  userLoginWithGet()
  {
   
    this.user = this.loginForm.value;
    this.userService.loginUserWithGet(this.user).subscribe((res:any)=>{
      if(res.message && res.message!==undefined) window.alert(res.message);
    });
  }

  get email(){
    return this.loginForm.get("email");
  }

  get password(){
    return this.loginForm.get("password");
  }

}
