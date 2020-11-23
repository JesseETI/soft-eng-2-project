import { Injectable } from "@angular/core";
import { CanLoad, Route, UrlSegment, Router } from "@angular/router";
import { AlertController, NavController } from "@ionic/angular";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "../service/auth.service";

@Injectable({
  providedIn: "root",
})
export class AutoLoginGuard implements CanLoad {
  constructor(
    private router: Router,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user.pipe(
      take(1),
      map((user) => {
        if (user && user.role === "USER") {
          this.navCtrl.navigateRoot("/users");
          return true;
        } else {
          return true;
        }
      })
    );
  }
}
