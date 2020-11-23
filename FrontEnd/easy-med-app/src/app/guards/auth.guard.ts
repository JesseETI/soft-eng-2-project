import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  CanLoad,
  Route,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { AlertController, NavController } from "@ionic/angular";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./../service/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanLoad {
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private auth: AuthService,
    private alertCtrl: AlertController
  ) {}
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.auth.user.pipe(
      take(1),
      map((user) => {
        if (
          !user ||
          user.msg === "Not a user"
          // || user.role !== route.data.role
        ) {
          this.alertCtrl
            .create({
              header: "Unauthorized",
              message: "You are not allowed to access that page.",
              buttons: ["OK"],
            })
            .then((alert) => alert.present());

          this.router.navigateByUrl("/");
          return false;
        } else if (user.role == route.data.role) {
          return true;
        } else if (user.role === "USER") {
          this.navCtrl.navigateRoot("/users");
        } else if (user.role === "PHARM") {
          this.navCtrl.navigateRoot("/pharms");
        }
      })
    );
  }
}
