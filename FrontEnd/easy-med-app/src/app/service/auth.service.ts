import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AlertController, Platform } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { BehaviorSubject, from, Observable, of } from "rxjs";
import { take, map, switchMap, catchError, filter } from "rxjs/operators";
const helper = new JwtHelperService();
const TOKEN_KEY = "jwt-token";
//CHANGEME: Change url's below
const LOGIN_URL = "http://localhost:8001/api/auth/login/";
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
    this.user = of({ email: "Test@tst.com", role: "USER" }); //DELETEME: Remove later
  }

  loadStoredToken() {
    let platformObs = from(this.storage.get(TOKEN_KEY));
    platformObs.pipe(take(1)).subscribe((token) => {
      console.log("token storage: ", token);
      if (token) {
        let decoded = helper.decodeToken(token);
        console.log("decoded: ", decoded);
        this.userData.next(decoded);
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
        if (res) return res.token; //TODO: change to get just the token from server response
        return null; //DELETEME: replace this with return res;
      }),
      switchMap((token) => {
        if (token == null) return of(null);
        let decoded = helper.decodeToken(token);
        this.user = of(decoded);

        let storageObs = from(this.storage.set(TOKEN_KEY, token));
        return storageObs;
      })
    );
  }

  register(formData: { email: string; password: string }): Observable<any> {
    formData = { email: formData.email, password: formData.password };
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
