import { analyzeAndValidateNgModules } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { filter, take } from "rxjs/operators";
import { AuthService } from "src/app/service/auth.service";
import { OrdersService } from "src/app/service/orders.service";
import { isError } from "util";

@Component({
  selector: "app-order-request",
  templateUrl: "./order-request.page.html",
  styleUrls: ["./order-request.page.scss"],
})
export class OrderRequestPage implements OnInit {
  myForm: FormGroup;
  medCount: number;
  selectedPharmacy: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private orders: OrdersService,
    private router: Router,
    private auth: AuthService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.selectedPharmacy = this.router.getCurrentNavigation().extras.state.selectedPharmacy;
        console.log(this.selectedPharmacy);
        this.myForm.patchValue({ pharmacy: this.selectedPharmacy });
      }
    });
  }

  ngOnInit() {
    this.medCount = 0;
    this.myForm = this.fb.group({
      user: new FormControl("", Validators.required),
      pharmacy: new FormControl("", Validators.required),
      prescriptionText: this.fb.array([]),
    });
    this.auth.user.subscribe((user) => {
      this.myForm.patchValue({ user: user.email });
    });
  }

  get prescriptionText() {
    return this.myForm.get("prescriptionText") as FormArray;
  }
  get pharmacy() {
    return this.myForm.get("pharmacy");
  }
  get user() {
    return this.myForm.get("user");
  }

  addMedicine() {
    const medicine = this.fb.group({
      //Can be expanded later
      medName: "",
      dosage: "",
      quantity: "",
    });
    this.prescriptionText.push(medicine);
  }
  deleteMedicine(index) {
    this.prescriptionText.removeAt(index);
    this.setMedCount();
  }
  submitOrder() {
    //TODO: flatten the medication to allow change
    //http://localhost:8001/api/orders/
    this.orders.sendOrder(this.myForm.value);
  }
  setMedCount() {
    this.medCount = 0;
    const data = this.myForm.value;
    for (let med of data.prescriptionText) {
      if (med.medName.length > 0) this.medCount++;
    }
  }
  submitButton() {
    if (
      this.selectedPharmacy &&
      this.selectedPharmacy.name.length > 0 &&
      this.medCount > 0
    )
      return false;
    return true;
  }
}
