import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

//import service
import { GitserviceService } from "./gitservice.service";
import { HttpClientModule } from '@angular/common/http';

//
import { ActivatedRoute, Router } from '@angular/router';
import { WrongCredentialsComponent } from './wrong-credentials/wrong-credentials.component';

const appRoutes: Routes = [{ path: 'userinfo', component: UserinfoComponent }
  , { path: 'wrong_credentials', component: WrongCredentialsComponent }]

//decorators
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserinfoComponent,
    WrongCredentialsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'userinfo', component: UserinfoComponent },
      { path: 'wrong_credentials', component: WrongCredentialsComponent }
    ])
  ],
  providers: [GitserviceService],
  bootstrap: [AppComponent] //first thing to load when app loads
})
export class AppModule { }
