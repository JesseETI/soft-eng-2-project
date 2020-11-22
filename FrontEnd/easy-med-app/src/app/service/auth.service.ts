import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AlertController, Platform } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { decode } from "querystring";
import { BehaviorSubject, from, Observable, of } from "rxjs";
import { take, map, switchMap, catchError, filter } from "rxjs/operators";
const helper = new JwtHelperService();
const TOKEN_KEY = "jwt-token";
//CHANGEME: Change urls below
const LOGIN_URL = "http://localhost:8001/api/api-token-auth/";
const REGISTER_URL = "http://localhost:8001/api/users/";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user: Observable<any>;
  public userData = new BehaviorSubject(null);

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private plt: Platform,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    this.loadStoredToken();
    this.user = this.userData.asObservable().pipe(filter((user) => user)); //filter out null
  }

  loadStoredToken() {
    let platformObs = from(this.storage.get(TOKEN_KEY));
    platformObs.pipe(take(1)).subscribe((token) => {
      console.log("token storage: ", token);
      if (token) {
        if (
          helper.getTokenExpirationDate() &&
          helper.getTokenExpirationDate(token).getTime() > new Date().getTime() // Test this
        ) {
          this.logout();
        } else {
          from(this.storage.get("role")).subscribe((role) => {
            let decoded = helper.decodeToken(token);
            decoded["role"] = role;
            this.userData.next(decoded);
          });
        }
      } else {
        this.userData.next({ msg: "Not a user" });
      }
    });
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(LOGIN_URL, credentials).pipe(
      take(1),
      // catchError((err) => {
      //   if (err.status === 0) {
      //     err.message =
      //       "Something wrong with our servers.. please wait for an update";
      //     err.name = "Server Error";
      //     this.presentAlert(err.name, err.message);
      //   }
      //   return of(false);
      // }),

      map((res: any) => {
        if (res) return res; //TODO: change to get just the token from server response
        return null;
      }),
      switchMap((res) => {
        if (res.token == null) return of(null);
        let decoded = helper.decodeToken(res.token);
        decoded["role"] = res.user.role;
        console.log(res.user.role);
        this.user = of(decoded);
        let storageObs = from(this.storage.set(TOKEN_KEY, res.token));
        this.storage.set("role", res.user.role);
        return storageObs;
      })
    );
  }

  register(formData: {
    email: string;
    password: string;
    role: string;
  }): Observable<any> {
    formData = {
      email: formData.email,
      password: formData.password,
      role: "USER",
    };
    console.log(formData);
    return this.http.post(REGISTER_URL, formData).pipe(
      take(1),
      catchError((err) => {
        console.log(err);
        return of(false);
      }),
      switchMap((res) => {
        if (res) return of(true);
        return of(false);
      })
    );
  }

  getUser() {
    return this.userData.getValue();
  }
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl("/");
      this.userData.next({ msg: "Not a user" });
    });
  }

  async presentAlert(status, reason) {
    const alert = await this.alertCtrl.create({
      header: status + " Error",

      message: reason,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
