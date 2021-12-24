import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-displaydatalist',
  templateUrl: './displaydatalist.component.html',
  styleUrls: ['./displaydatalist.component.css']
})
export class DisplaydatalistComponent implements OnInit {
  listData : Array<Number> = [1,2,3,4,];
  constructor() { }

  ngOnInit(): void {
  }

}
