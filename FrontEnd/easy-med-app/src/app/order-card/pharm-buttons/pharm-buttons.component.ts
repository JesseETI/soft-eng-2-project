import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-pharm-buttons",
  templateUrl: "./pharm-buttons.component.html",
  styleUrls: ["./pharm-buttons.component.scss"],
})
export class PharmButtonsComponent implements OnInit {
  @Input() status;
  constructor() {}

  ngOnInit() {}
}
