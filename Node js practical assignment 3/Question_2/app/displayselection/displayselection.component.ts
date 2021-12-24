import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-displayselection',
  templateUrl: './displayselection.component.html',
  styleUrls: ['./displayselection.component.css']
})
export class DisplayselectionComponent implements OnInit {

  selection : Array<String> = ["textbox", "textarea"];
  textbox = true;
  textarea = false;
  constructor() { }

  ngOnInit(): void {
  }
  changeBox() {
    if(this.textbox){
      this.textbox = false;
      this.textarea = true;
    }else{
        this.textarea = false;
        this.textbox = true;
    }
  }
}
