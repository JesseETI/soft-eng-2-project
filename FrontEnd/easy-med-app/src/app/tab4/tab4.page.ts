import { Component } from "@angular/core";
import { AuthService } from "../service/auth.service";

@Component({
  selector: "app-tab3",
  templateUrl: "tab4.page.html",
  styleUrls: ["tab4.page.scss"],
})
export class Tab4Page {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
