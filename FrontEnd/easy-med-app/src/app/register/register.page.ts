import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private auth:AuthService,private router: Router, private alertCtrl:AlertController,private toastCtrl:ToastController) { }

  ngOnInit() {

  }
  // TODO: Add validation
  register(formData) {
    if (formData.value.password != formData.value.confirm){
      this.presentAlert("Registration", "Mismatching Passwords");
      return;
    }
    this.auth.register(formData.value).subscribe(async res =>{
      console.log("Returned register value: " + res);
      if (res){
        //if successful register
        const toast = await this.toastCtrl.create({
          message: 'Registration complete',
          duration: 2000
        });
        toast.present();
        this.router.navigateByUrl('/');
      }else{
        
        this.router.navigateByUrl('register');
      }
    });
  }
  async presentAlert(status, reason) {
    const alert = await this.alertCtrl.create({
        header: status + ' Error',
        message: reason,
        buttons: ['OK']
    });

    await alert.present();
}

}
