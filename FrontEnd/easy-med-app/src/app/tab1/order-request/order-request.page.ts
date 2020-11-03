import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-request',
  templateUrl: './order-request.page.html',
  styleUrls: ['./order-request.page.scss'],
})
export class OrderRequestPage implements OnInit {
  myForm: FormGroup;
  medCount: number;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.medCount=0;
    this.myForm = this.fb.group({
      name:new FormControl('', Validators.required),
      medicines: this.fb.array([]),


    })
  }

  get medicines() {
    return this.myForm.get('medicines') as FormArray;
  }

  addMedicine(){
    const medicine = this.fb.group({
      //Can be expanded later
      medInfo:"",
    })
    this.medicines.push(medicine);
  }
  deleteMedicine(index){
    this.medicines.removeAt(index); 
    this.setMedCount(); 
  }
  submitOrder(){
    console.log(this.myForm.value);
  }
  setMedCount(){
    
    this.medCount=0;
    const data = this.myForm.value;
    for (let med of data.medicines){
      if (med.medInfo.length >0) this.medCount++;
    }
    console.log(this.medCount);
  }

}
