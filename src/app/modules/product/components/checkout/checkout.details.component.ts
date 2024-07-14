import { Component, OnInit } from '@angular/core';
import { ShippingForm } from './model/ShippingForm.model';
import { ShippingService } from '../../services/commande.service';

@Component({
  selector: 'app-checkout-details',
  templateUrl: './checkout.details.component.html',
  styleUrls: []
})
export class CheckoutDetailsComponent implements OnInit {
  checkouts: ShippingForm[] = [];

  constructor(private shippingService: ShippingService) {}

  ngOnInit(): void {
    this.loadCheckouts();
  }

  loadCheckouts() {
    this.shippingService.getAllShipping().subscribe(
      (data: ShippingForm[]) => {
        this.checkouts = data;
      },
      (error) => {
        console.error('Error fetching checkouts:', error);
        alert('Error fetching checkout information. Please try again later.');
      }
    );
  }

  editCheckout(id: number) {
    console.log(`Editing checkout with ID ${id}`);
    // Implement edit functionality if needed
  }

  deleteCheckout(id: number) {
    if (confirm('Are you sure you want to delete this checkout?')) {
      this.shippingService.deleteShipping(id).subscribe(
        () => {
          console.log('Checkout deleted successfully!');
          alert('Checkout deleted successfully!');
          this.loadCheckouts(); // Reload list after delete
        },
        (error) => {
          console.error('Error deleting checkout:', error);
          alert('Error deleting checkout. Please try again later.');
        }
      );
    }
  }
}
