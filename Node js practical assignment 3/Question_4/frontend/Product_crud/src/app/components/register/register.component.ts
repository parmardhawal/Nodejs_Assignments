import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { User } from '../../User';
import { UserServiceService } from '../../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 
  registerForm:FormGroup = new FormGroup({
    name : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(3)])
  });

  user:User[]=[];

  constructor(private userService:UserServiceService,private router:Router) {
    
   }

  ngOnInit(): void {
    
  }
  
  register(){
    this.user = this.registerForm.value;
    console.log(this.user);    
    this.userService.registerUser(this.user).subscribe((res:any)=>{
      if(res.message!==undefined) window.alert(res.message);

      if(res.status!==undefined && res.status)
      {
        this.registerForm.reset();
        this.router.navigate(["/login"]);
      }
     

    });
  }


  get name(){
    return this.registerForm.get("name");
  }
  get email(){
    return this.registerForm.get("email");
  }

  get password(){
    return this.registerForm.get("password");
  }

  get f(){
    return this.registerForm.controls;
  }

}
