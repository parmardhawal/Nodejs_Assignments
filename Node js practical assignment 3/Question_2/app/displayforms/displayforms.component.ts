import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-displayforms',
  templateUrl: './displayforms.component.html',
  styleUrls: ['./displayforms.component.css']
})
export class DisplayformsComponent implements OnInit {
  form!:FormGroup;
  constructor(private formBuilder:FormBuilder, private router:Router) { }

  createForm(){
    this.form = this.formBuilder.group({
      firstname:[''],
      lastname:[''],
      email:[''],
      password:[''],
    })
  }
  sendData(){
    this.router.navigate(["/displayformdata"],{state:this.form.value})
  }
  ngOnInit(): void {
    this.createForm();
  }

}
