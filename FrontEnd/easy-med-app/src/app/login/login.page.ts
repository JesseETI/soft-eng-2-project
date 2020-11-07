import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials= {email: '', password:''};
  constructor(private auth: AuthService, private alertCtrl: AlertController,private router: Router) {

   }

  ngOnInit() {
  }
  // TODO: Add validation
  login() {
    this.auth.login(this.credentials).subscribe(async res => {
      if (res) {
        console.log(res);
        this.router.navigateByUrl('/members');
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Login Failed',
          message: 'Wrong credentials.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

}
