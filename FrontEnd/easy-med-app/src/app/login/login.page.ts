import { AuthService } from "./../service/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, NavController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  credentials = { email: "u@u.com", password: "123" };
  constructor(
    private auth: AuthService,
    private alertCtrl: AlertController,

    private navCtrl: NavController
  ) {}

  ngOnInit() {}
  // TODO: Add validation
  login() {
    this.auth.login(this.credentials).subscribe(async (res) => {
      if (res) {
        this.navCtrl.navigateRoot("/users");
      } else {
        //TODO: if login fails
      }
    });
  }
}
