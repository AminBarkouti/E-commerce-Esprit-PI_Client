import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShippingService } from '../../services/commande.service';
import { ShippingForm } from './model/ShippingForm.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: []
})
export class CheckoutComponent implements OnInit {
  shippingForm: FormGroup = new FormGroup({}); // Initialize FormGroup here

  constructor(
    private formBuilder: FormBuilder,
    private shippingService: ShippingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.shippingForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['India', Validators.required], // default value
      postalCode: ['', Validators.required],
      comments: [false] // checkbox for use as permanent address
    });
  }

  onSave(): void {
    if (this.shippingForm.valid) {
      const formData: ShippingForm = this.shippingForm.value;
      this.shippingService.createShipping(formData).subscribe(
        response => {
          console.log('Shipping information saved successfully:', response);
          alert('Order saved successfully.');
          
        },
        error => {
          console.error('Error saving shipping information:', error);
          // Add error handling logic (e.g., display error message)
          alert('Error saving shipping information. Please try again later.');
        }
      );
    } else {
      console.error('Form is invalid. Cannot save shipping information.');
    }
  }

 

 
  navigateToCheckoutDetails() {
    this.router.navigateByUrl('/checkout-details');
  }

  // Getter methods for form controls to simplify template code
  get firstName() { return this.shippingForm.get('firstName'); }
  get lastName() { return this.shippingForm.get('lastName'); }
  get email() { return this.shippingForm.get('email'); }
  get mobile() { return this.shippingForm.get('mobile'); }
  get address() { return this.shippingForm.get('address'); }
  get city() { return this.shippingForm.get('city'); }
  get state() { return this.shippingForm.get('state'); }
  get country() { return this.shippingForm.get('country'); }
  get postalCode() { return this.shippingForm.get('postalCode'); }
}