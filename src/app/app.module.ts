import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { UsersServiceBase, UsersServiceApi } from './users.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    { provide: UsersServiceBase, useClass: UsersServiceApi },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }