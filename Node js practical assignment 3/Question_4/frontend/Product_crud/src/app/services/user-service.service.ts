import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../User'; 
import { Product } from '../Product';

const httpOption = {
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  }),
 
}

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  private apiUrl = "http://127.0.0.1:3000/api/auth";


  private headers:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http : HttpClient) { }

  registerUser(newUser:User[]):Observable<User>{
    
    const url= `${this.apiUrl}/register`;
    return this.http.post<User>(url,newUser,{headers:this.headers});
  }

  loginUser(user:User[]):Observable<User>{
    const url = `${this.apiUrl}/login`;
    
    return this.http.post<User>(url,user,{headers:this.headers,withCredentials:true});
  }



  loginUserWithGet(user:User[]):Observable<User>{
    
   
    const userData=[];
    for(let u in user)
    {
      userData.push(user[u]);
    }
  

    const url = `${this.apiUrl}/login/${userData[0]}/${userData[1]}`;
    return this.http.get<User>(url,{withCredentials:true});
  }

  verifiedUser(token:any){
    const url = `${this.apiUrl}/user`;
    this.headers.append("auth_token",`${token}`);
    return this.http.get(url,{headers:this.headers});
  }

  GetProducts():Observable<Product[]>{
    const api = "http://localhost:3000/api/products";
    return this.http.get<Product[]>(api,{headers:new HttpHeaders({'Content-Type':'application/json'})});
  }

  deleteProduct(product:Product):Observable<Product>
  {
    const api = `http://localhost:3000/api/products/${product._id}`;
    return this.http.delete<Product>(api,{headers:new HttpHeaders({'Content-Type':'application/json'})});
  }

  InsertProduct(product:Product):Observable<Product>
  {
    const api = `http://localhost:3000/api/products`;
    return this.http.post<Product>(api,product,{headers:new HttpHeaders({'Content-Type':'application/json'})});
  }

}
