import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-displayformsdatadetails',
  templateUrl: './displayformsdatadetails.component.html',
  styleUrls: ['./displayformsdatadetails.component.css']
})
export class DisplayformsdatadetailsComponent implements OnInit {
  firstname = "";
  lastname = "";
  email = "";
  password="";
  data:any;
  constructor(private router:Router) { 
    this.data = this.router.getCurrentNavigation()?.extras.state
    this.firstname = this.data.firstname;
    this.lastname = this.data.lastname;
    this.email = this.data.email;
    this.password=this.data.password;
  }
  ngOnInit(): void {
  }

}
