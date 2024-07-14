import { Component, OnInit } from '@angular/core';
import { ShippingForm } from './model/ShippingForm.model';
import { ShippingService } from '../../services/commande.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-checkout-details',
  templateUrl: './checkout.details.component.html',
  styleUrls: []
})
export class CheckoutDetailsComponent implements OnInit {
  checkouts: ShippingForm[] = [];
  selectedCheckout: ShippingForm | null = null; // Initialize selectedCheckout

  constructor(private shippingService: ShippingService, private router: Router) {}

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
    this.router.navigate(['/checkout-edit', id]);
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

  printPDF(checkout: ShippingForm): void {
    if (checkout) {
      console.log('Printing PDF for:', checkout);
      const doc = new jsPDF(); // Create a new jsPDF instance

      // Generate PDF content
      const pdfContent = `
        ID: ${checkout.idCommande}
        First Name: ${checkout.firstName}
        Last Name: ${checkout.lastName}
        Email: ${checkout.email}
        Mobile: ${checkout.mobile}
        Address: ${checkout.address}
      `;

      // Add text to PDF
      doc.text(pdfContent, 10, 10);

      // Save PDF
      doc.save(`checkout_${checkout.idCommande}.pdf`);
    } else {
      console.error('No checkout selected');
    }
  }
}
