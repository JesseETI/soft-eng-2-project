import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import {take,map,switchMap} from 'rxjs/operators';
const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';
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
        }else{
          return null;
        }
      })
    );
  }

  login(credentials:{email:string,pw:string}): Observable<any>{
    //TODO: Add send to server part here
    if (credentials.email !="root"|| credentials.pw !="toor"){
      return of(null);
    }
    return this.http.get('https://randomuser.me/api/').pipe(
      take(1),
      map((res) => {
        return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6IjU1M2IyZmJmLTFmYzItNDZhZS1iMjc1LWZmNjNiODVjYTFjMyIsImlhdCI6MTYwMzEzNjQxNCwiZXhwIjoxNjAzMTQwMDE0fQ.ZVxhFc0CB-NVspQmb__vUAqWSQXuaxtiY7DHM_isEw4'
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

    })

  }
  
}
