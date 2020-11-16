import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./../service/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService,
    private alertCtrl: AlertController
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.auth.user.pipe(
      take(1),
      map((user) => {
        console.log(user);
        //FIXME: if (!user || user.role !== route.data.role) change below to select by user
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
          this.router.navigateByUrl("/users");
        } else if (user.role === "PHARM") {
          this.router.navigateByUrl("/pharms");
        }
      })
    );
  }
}
