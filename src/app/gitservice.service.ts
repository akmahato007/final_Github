import { Injectable } from '@angular/core';

//included files
import { HttpClient , HttpHeaders, HttpClientModule} from '@angular/common/http'
import {HttpErrorResponse , HttpParams} from '@angular/common/http'

//activate route
import { ActivatedRoute } from '@angular/router'
import { Observable }  from "rxjs-compat"

//import catcg to handle errors
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'


@Injectable({
  providedIn: 'root'
})
export class GitserviceService {
 
  msg: any;
 
  constructor(private _http:HttpClient , private _route:ActivatedRoute) { 
    console.log('service constructor called')
  }

  setMsg(data){
    this.msg = data
  }

  getMsg(){
    return this.msg
  }

  //state management session
  // public getUserNameFromLocalStorage = ()=>{

  //   return JSON.parse(localStorage.getItem('username'))
  
  // }// getUserInfoFromLocalStorage

  // public getUserPasswordFromLocalStorage = ()=>{

  //   return JSON.parse(localStorage.getItem('password'))
  
  // }


  // public setUserInfoFromLocalStorage(username,password){

  //   localStorage.setItem('username', JSON.stringify(username))
  //   localStorage.setItem('password', JSON.stringify(password))
  // }



  public signIn(username,password):Observable<any>{
    let res;

    var auth= btoa(username + ":" + password)
    console.log(auth)

    let baseUrl = 'https://api.github.com/user'
    res = this._http.get<any>(baseUrl ,{
      headers : new HttpHeaders(
        {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': 'Basic '+ auth 
        }
      )
    }).catch(this.errorHandler)
    console.log(res)
    return res
  }


  errorHandler(error :HttpErrorResponse) {
    return Observable.throw(error.message)
  }




  //search service for git users
  public searchUser(search):Observable<any>{
    let fullUrl = 'https://api.github.com/users/' + search
    
    
    const params1 = new HttpParams()
      .set('client_ID', '137d108ac6debf5fb901')
      .set('client_Secret','26992b0e620b10b92d4ad050b0bcb7bcd26002b1')
      let a =  this._http.get(fullUrl, {
        params: params1
      })
      
      // .catch(this.errorHandler)
      console.log("service")
      console.log(a)
      return a
  
  }

  // errorHandler(error:HttpErrorResponse){
  //   return Observable.throw(error.message)
  // }
  
  
}

