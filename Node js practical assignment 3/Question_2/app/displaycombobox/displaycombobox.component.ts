import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-displaycombobox',
  templateUrl: './displaycombobox.component.html',
  styleUrls: ['./displaycombobox.component.css']
})
export class DisplaycomboboxComponent implements OnInit {
  city=["surat","delhi","munbai","pune"];
  constructor() { }

  ngOnInit(): void {
  }

}
