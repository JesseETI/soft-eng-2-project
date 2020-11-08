import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController) { }
 
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.auth.userData.pipe(
      take(1),
      map(user => {
        console.log(user);
        if (!user || user.role !== route.data.role) {
          this.alertCtrl.create({
            header: 'Unauthorized',
            message: 'You are not allowed to access that page.',
            buttons: ['OK']
          }).then(alert => alert.present());
 
          this.router.navigateByUrl('/');
          return false;
        } else {
          //TODO: add role pages redirection here
          return true;
        }
      })
    )
  }
}