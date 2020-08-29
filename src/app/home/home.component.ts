import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
//importing git service from service file to get service here
import { GitserviceService } from '../gitservice.service';
//import Http Client
import { HttpClient } from '@angular/common/http';
//
import { ActivatedRoute, Router } from '@angular/router';
//cookie
import { Cookie } from 'ng2-cookies/ng2-cookies';

//decorators
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  template: `
    <h3>{{errorMsg}}</h3>
  `,
  styleUrls: ['./home.component.css']
})


//simple class
export class HomeComponent implements OnInit {

  username: any
  password: any
  errorMsg: any
  message: string

  constructor(private _http: HttpClient, private gitService: GitserviceService, private Aroute: ActivatedRoute,
    private route: Router) { }

  ngOnInit(): void {

    // this.gitService.signIn(this.username,this.password).subscribe(
    //   error=>{
    //     console.log(error)        
    //   }       
    // )
  }


  public signIn() {
    this.gitService.signIn(this.username, this.password).subscribe(

      data => {
        if (this.username == '' || this.username == undefined || this.username == null || this.password == '' ||
          this.password == 'undefined' || this.password == null) {
          alert('Enter your GitHub Credentials')
        } else {
          console.log(data)


          //clearing localstorage cookie value before setting username and password
          // localStorage.clear();
          // this.gitService.setUserInfoFromLocalStorage(this.username,this.password)
          Cookie.deleteAll();
          Cookie.set('username', this.username)
          Cookie.set('password', this.password)
          // Cookie.set('login', this.login)

          //using setter to set msg
          //this.gitService.setMsg(data)
          this.route.navigate(['/userinfo'])
        }


      },
      error => {
        // localStorage.clear();

        if (this.username == '' || this.username == undefined || this.username == null || this.password == '' ||
          this.password == 'undefined' || this.password == null)
          alert('Enter your GitHub Credentials')

        else {
          Cookie.deleteAll();

          // this.errorMsg = error
          alert("Invalid Credentials")
        }

      }
    )
  }

}
