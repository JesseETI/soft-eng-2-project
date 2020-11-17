import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { from, Observable, throwError } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private alertController: AlertController,
    private storage: Storage,
    private auth: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.storage.get("jwt-token")).pipe(
      switchMap((token) => {
        console.log(token);
        if (token) {
          console.log("Token Found");
          request = request.clone({
            headers: request.headers.set("Authorization", "JWT " + token),
          });
        }

        if (!request.headers.has("Content-Type")) {
          request = request.clone({
            headers: request.headers.set("Content-Type", "application/json"),
          });
        }

        return next.handle(request).pipe(
          map((event) => {
            if (event instanceof HttpResponse) {
              //TODO: do something to the response
            }
            return event;
          }),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            const status = error.status;
            const reason =
              error && error.error.email
                ? error.error.email[0]
                : error.error.non_field_errors
                ? error.error.non_field_errors[0]
                : error.error.detail
                ? error.error.detail
                : error.status == 0
                ? "We have a server error, it will  be fixed soon.."
                : "Unknown Error.. contact our developers";

            this.presentAlert(status, reason);
            if (error.status == 401) this.auth.logout();
            return throwError(error);
          })
        );
      })
    );
  }

  async presentAlert(status, reason) {
    const alert = await this.alertController.create({
      header: status + " Error",

      message: reason,
      buttons: ["OK"],
    });

    await alert.present();
  }
}
