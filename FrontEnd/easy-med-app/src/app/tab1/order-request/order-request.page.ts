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
import { OrdersService } from "src/app/service/orders.service";

@Component({
  selector: "app-order-request",
  templateUrl: "./order-request.page.html",
  styleUrls: ["./order-request.page.scss"],
})
export class OrderRequestPage implements OnInit {
  myForm: FormGroup;
  medCount: number;
  selectedPharmacy: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private orders: OrdersService,
    private router: Router
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
      name: new FormControl("", Validators.required),
      pharmacy: new FormControl("", Validators.required),
      medicines: this.fb.array([]),
    });
  }

  get medicines() {
    return this.myForm.get("medicines") as FormArray;
  }
  get pharmacy() {
    return this.myForm.get("pharmacy");
  }
  get name() {
    return this.myForm.get("name");
  }

  addMedicine() {
    const medicine = this.fb.group({
      //Can be expanded later
      medName: "",
      dosage: "",
      quantity: "",
    });
    this.medicines.push(medicine);
  }
  deleteMedicine(index) {
    this.medicines.removeAt(index);
    this.setMedCount();
  }
  submitOrder() {
    console.log(this.myForm.value);
  }
  setMedCount() {
    this.medCount = 0;
    const data = this.myForm.value;
    for (let med of data.medicines) {
      if (med.medName.length > 0) this.medCount++;
    }
    console.log(this.medCount);
  }
  submitButton() {
    if (
      this.name.value.length > 0 &&
      this.pharmacy.value.length > 0 &&
      this.medCount > 0
    )
      return false;
    return true;
  }
}