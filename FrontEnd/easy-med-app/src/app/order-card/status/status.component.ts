import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-status",
  templateUrl: "./status.component.html",
  styleUrls: ["./status.component.scss"],
})
export class StatusComponent implements OnInit {
  @Input() status;
  statusText: string;

  constructor() {}

  ngOnInit() {
    switch (this.status) {
      case 0: {
        this.statusText = "Pending";
        break;
      }
      case 1: {
        this.statusText = "Ready";
        break;
      }

      case 2: {
        this.statusText = "Cancelled";
        break;
      }
    }
  }
}
