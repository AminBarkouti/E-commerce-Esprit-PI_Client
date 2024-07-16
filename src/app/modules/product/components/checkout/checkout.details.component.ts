import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShippingForm } from './model/ShippingForm.model';
import { ShippingService } from '../../services/commande.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-checkout-details',
  templateUrl: './checkout.details.component.html',
  styleUrls: []
})
export class CheckoutDetailsComponent implements OnInit {
  checkouts: ShippingForm[] = [];
  paginatedCheckouts: ShippingForm[] = [];
  selectedCheckout: ShippingForm | null = null;
  
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;
  totalPages = 0;

  @ViewChild('qrCanvas', { static: false }) qrCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private shippingService: ShippingService, private router: Router) {}

  ngOnInit(): void {
    this.loadCheckouts();
  }

  loadCheckouts() {
    this.shippingService.getAllShipping().subscribe(
      (data: ShippingForm[]) => {
        this.checkouts = data;
        this.totalItems = data.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.paginateCheckouts();
      },
      (error) => {
        console.error('Error fetching checkouts:', error);
        alert('Error fetching checkout information. Please try again later.');
      }
    );
  }

  paginateCheckouts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCheckouts = this.checkouts.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginateCheckouts();
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

  generateQRCode(checkout: ShippingForm): void {
    if (checkout) {
      const qrData = JSON.stringify({
        idCommande: checkout.idCommande,
        firstName: checkout.firstName,
        lastName: checkout.lastName,
        email: checkout.email,
        mobile: checkout.mobile,
        address: checkout.address
      });

      QRCode.toDataURL(qrData, { errorCorrectionLevel: 'H' }, (error, url) => {
        if (error) {
          console.error('Error generating QR code:', error);
        } else if (url && window) {
          // Open QR code in new tab
          const newWindow = window.open();
          if (newWindow) {
            newWindow.document.write(`<img src="${url}" alt="QR Code"/>`);
          } else {
            console.error('Failed to open new window');
          }
        }
      });
    } else {
      console.error('No checkout selected');
    }
  }
}
