import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform } from '@ionic/angular';
import {Storage} from '@ionic/storage';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import {take,map,switchMap} from 'rxjs/operators';
const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';
const SERVER_URL = 'https://'
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

  login(credentials:{email:string,pw:string}): Observable<any>{
    // TODO: Add send to server part here
    
    return this.http.post(SERVER_URL,credentials).pipe(
      take(1),
      map((res:any) => {
        return res.token
      }),
      switchMap(token =>{
        let decoded = helper.decodeToken(token);
        console.log('login decoded: ' + decoded);
        this.userData.next(decoded);

        let storageObs = from(this.storage.set(TOKEN_KEY,token));
        return storageObs;
      })

    );
  
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
