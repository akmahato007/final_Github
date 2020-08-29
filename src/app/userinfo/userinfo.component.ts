import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GitserviceService } from '../gitservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css'],
})
export class UserinfoComponent implements OnInit {

  username: any
  password: any
  search: any

  public final_data
  errorMsg: any;
  //response from existing Apis

  public searchedUser;
  public searchFlag = false;

  constructor(private _http: HttpClient, private gitService: GitserviceService, private Aroute: ActivatedRoute,
    private route: Router) { }


  ngOnInit(): void {
    //using getter to getMsg

    //this.final_data = this.gitService.getMsg()
    //console.log(this.final_data)
    let username = Cookie.get('username')
    let password = Cookie.get('password')
    this.gitService.signIn(username, password).subscribe(

      data => {
        console.log(data)
        this.final_data = data;
      },

      error => {
        this.errorMsg = error
      }
    )
  }



  // public searchUser(){
  //   // console.log(this.email)
  //   // console.log(this.password)
  //    this.searchedUser = this.gitService.searchUser(this.search).subscribe(
  //     data=>{
  //       if(this.search=''||this.search == undefined|| this.search == null){
  //         alert("Enter a user name to search")
  //       }
  //       else{

  //         console.log(data)
  //       }
  //     },
  //     error=>{
  //       if(this.search=''||this.search == undefined|| this.search == null){
  //         alert("Enter a user name to search")
  //       }else{
  //         this.errorMsg = error

  //       }

  //     }

  //    ) 
  // }



  public searchUser() {
    // console.log(this.email)
    // console.log(this.password)
    this.gitService.searchUser(this.search).subscribe(
      data => {
        if (this.search = '' || this.search == undefined || this.search == null) {
          alert("Enter a user name to search")
        } else {
          this.searchedUser = data
          console.log(this.searchedUser)
          this.searchFlag = true;
        }
      },
      error => {
        alert("Invalid User......")
        this.errorMsg = error
        console.log(error)
      }

    )
  }

  public logout() {
    Cookie.deleteAll();
    this.route.navigate(['/home'])
  }



}



