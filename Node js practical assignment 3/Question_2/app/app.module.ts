import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplaycomboboxComponent } from './displaycombobox/displaycombobox.component';
import { DisplaydatatypeComponent } from './displaydatatype/displaydatatype.component';
import { DisplayformsComponent } from './displayforms/displayforms.component';
import { DisplayformsdatadetailsComponent } from './displayformsdatadetails/displayformsdatadetails.component';
import { DisplaydatalistComponent } from './displaydatalist/displaydatalist.component';
import { DisplayselectionComponent } from './displayselection/displayselection.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const appRoutes:Routes = [
  {
    path: '', component:AppComponent
  },
  {
    path:'displaycombobox', component:DisplaycomboboxComponent
  },
  {
    path:'displaytype', component: DisplaydatatypeComponent
  },
  {
    path:'displayform', component: DisplayformsComponent
  },
  {
    path:'displayformdata', component: DisplayformsdatadetailsComponent
  },
  {
    path:'displaylist', component: DisplaydatalistComponent
  },
  {
    path:'displayselection', component: DisplayselectionComponent
  },
  
]
@NgModule({
  declarations: [
    AppComponent,
    DisplaycomboboxComponent,
    DisplaydatatypeComponent,
    DisplayformsComponent,
    DisplayformsdatadetailsComponent,
    DisplaydatalistComponent,
    DisplayselectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
