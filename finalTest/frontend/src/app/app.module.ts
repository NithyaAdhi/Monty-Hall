import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MontyHallComponent } from './monty-hall/monty-hall.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MontyHallService } from './monty-hall.service';
@NgModule({
  declarations: [
    AppComponent,
    MontyHallComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    MontyHallService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
