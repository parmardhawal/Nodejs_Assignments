import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subscriber } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  // private socket : SocketIOClient.socket;

  constructor() { 
    // this.socket = io("http://localhost:3000");
  }


  // listen(eventname:string):Observable<any>{
  //   return new Observable((subscribe)=>{
  //     this.socket.emit(eventname,(data:any)=>{
  //       subscribe.next(data);
  //     });
  //   });
  // }

  // emit(eventname:string,data:any){
  //   this.socket.emit(eventname,data);
  // }



}
