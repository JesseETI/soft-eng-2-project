import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform } from '@ionic/angular';
import {Storage} from '@ionic/storage';
import { BehaviorSubject, from, Observable, of} from 'rxjs';
import {take,map,switchMap, catchError, tap} from 'rxjs/operators';
const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';
//CHANGEME: Change url's below
const LOGIN_URL = 'https://reqres.in/api/login'
const REGISTER_URL = 'https://reqres.in/api/register'
// DELETEME: A test JWT
const TEST_JWT_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6IjU1M2IyZmJmLTFmYzItNDZhZS1iMjc1LWZmNjNiODVjYTFjMyIsImlhdCI6MTYwMzEzNjQxNCwiZXhwIjoxNjAzMTQwMDE0fQ.ZVxhFc0CB-NVspQmb__vUAqWSQXuaxtiY7DHM_isEw4";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<any>;
  private userData= new BehaviorSubject(null);
 
  constructor(private storage: Storage, private http: HttpClient, 
    private plt: Platform, private router: Router) { 
      this.loadStoredToken();
  }

  loadStoredToken(){
    let platformObs = from(this.plt.ready());
    this.user = platformObs.pipe(
      switchMap(()=> {
        return from(this.storage.get(TOKEN_KEY));
      }),
      map((token:any) =>{
        console.log("token storage: ", token);
        if (token) {
          let decoded = helper.decodeToken(token);
          console.log('decoded: ',decoded);
          this.userData.next(decoded);
          return true;
        }else{
          return null;
        }
      })
    );
  }

  login(credentials:{email:string,password:string}): Observable<any>{
    
    
    return this.http.post(LOGIN_URL,credentials).pipe(
      take(1),
      catchError((err) =>{
        console.log("Server Error..");
        return of(null);
      }),
      
      map((res:any) => {
        if (res) return TEST_JWT_KEY;
        return TEST_JWT_KEY; //DELETEME: replace this with return res;
      }),
      switchMap(token =>{
        if (token === null) return of(null);
        let decoded = helper.decodeToken(token);
        console.log('login decoded: ' + decoded);
        this.userData.next(decoded);

        let storageObs = from(this.storage.set(TOKEN_KEY,token));
        return storageObs;
      }),
      

    );
  
  }

  register(formData:{email:string, password:string}): Observable<any>{
    return this.http.post(REGISTER_URL, formData).pipe(
      take(1),
      
      catchError((err) =>{
        console.log(err);
        return of(false);
      }),
      switchMap(res=>{
        if (res) return of(true);
        return of(false);
      })


    )
  }

  getUser(){
    return this.userData.getValue();
  }
  logout(){
    this.storage.remove(TOKEN_KEY).then(()=>{
      this.router.navigateByUrl('/');
      this.userData.next(null);

    });

  }
  
}
