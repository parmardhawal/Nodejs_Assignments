import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'websocket';
  userName:string="";
  message:string="";
  output:any[]=[];
  feedback:string="";

  constructor(private webSocketService:WebSocketService){

  }

  ngOnInit(): void {
      this.webSocketService.listen("chat").subscribe((data)=>this.updateFeedBack(data))
      this.webSocketService.listen("typing").subscribe((data)=>this.updateMessage(data));
  }
  updateMessage(data: any): void {
    this.feedback="";
    if(!data){
      return;
    }

    this.output.push(data);
  }
  updateFeedBack(data: any): void {
    this.feedback = `${this.userName} is typing...`;
  }

  messageTyping()
  {
    console.log(`${this.userName} is typing...`);
    this.webSocketService.emit("typing",this.userName);
  }

  sendMessage(){
    console.log({
        message:this.message,
        userName :this.userName
    });

    this.webSocketService.emit("chat",this.userName);

    this.message = "";
  }
}
