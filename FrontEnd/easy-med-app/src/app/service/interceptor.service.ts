import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {Storage} from '@ionic/storage';
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    

    constructor(private alertController: AlertController, private storage: Storage) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        

        return from(this.storage.get('jwt-token'))
            .pipe(
                switchMap(token => {
                    console.log(token);
                    if (token) {
                        console.log("Token Found");
                        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
                    }

                    if (!request.headers.has('Content-Type')) {
                        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
                    }

                    return next.handle(request).pipe(
                        map(event => {
                            if (event instanceof HttpResponse) {
                                //TODO: do something to the response
                            }
                            return event;
                        }),
                        catchError((error: HttpErrorResponse) => {
                            console.log(error);
                            const status =  error.status;
                            const reason = (error && error.error.error) ? error.error.error : '';

                            this.presentAlert(status, reason);
                            return throwError(error);
                        })
                    );
                })
            );


    }

    async presentAlert(status, reason) {
        const alert = await this.alertController.create({
            header: status + ' Error',
            
            message: reason,
            buttons: ['OK']
        });

        await alert.present();
    }
}
        
        
        
 

    
    
  