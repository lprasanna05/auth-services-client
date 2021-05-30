import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import {ButtonModule} from 'primeng/button';
import {AuthModule} from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
