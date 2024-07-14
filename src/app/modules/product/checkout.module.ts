import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutDetailsComponent } from './components/checkout/checkout.details.component';
import { ShippingService } from './services/commande.service';
import { CheckoutEditComponent } from './components/checkout/checkout.edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
   // CheckoutDetailsComponent,
   
    
    // other components
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // other modules
  ],
  providers: [ShippingService],
  exports: [
   // CheckoutDetailsComponent,
    // other components to export
  ]
})
export class CheckoutModule { }
