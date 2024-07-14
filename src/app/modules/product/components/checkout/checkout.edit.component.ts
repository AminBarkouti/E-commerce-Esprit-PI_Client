import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShippingService } from '../../services/commande.service';
import { ShippingForm } from './model/ShippingForm.model';

@Component({
  selector: 'app-checkout-edit',
  templateUrl: './checkout.edit.component.html',
  styleUrls: []
})
export class CheckoutEditComponent implements OnInit {
  checkoutForm: FormGroup = new FormGroup({});
  checkoutId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private shippingService: ShippingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkoutId = this.route.snapshot.params['id'];
    this.initForm();
    this.loadCheckoutData();
  }

  initForm(): void {
    this.checkoutForm = this.formBuilder.group({
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

  loadCheckoutData(): void {
    this.shippingService.getShipping(this.checkoutId).subscribe(
      (data: ShippingForm) => {
        this.checkoutForm.patchValue(data);
      },
      (error) => {
        console.error('Error fetching checkout data:', error);
        alert('Error fetching checkout data. Please try again later.');
      }
    );
  }

  onSave(): void {
    if (this.checkoutForm.valid) {
      const formData: ShippingForm = this.checkoutForm.value;
      this.shippingService.updateShipping(this.checkoutId, formData).subscribe(
        (response) => {
          console.log('Checkout updated successfully:', response);
          this.router.navigateByUrl('/checkout-details');
        },
        (error) => {
          console.error('Error updating checkout:', error);
          alert('Error updating checkout. Please try again later.');
        }
      );
    } else {
      console.error('Form is invalid. Cannot save checkout information.');
    }
  }
}
