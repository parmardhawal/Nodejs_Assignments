import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-displaydatatype',
  templateUrl: './displaydatatype.component.html',
  styleUrls: ['./displaydatatype.component.css']
})
export class DisplaydatatypeComponent implements OnInit {
  name : string = "hello";
  age : number = 20;
  birthdate : Date = new Date('2000-09-20');
  constructor() { }

  ngOnInit(): void {
  }

}
