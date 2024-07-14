import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './components/product/product.component';
import { ProductdetailComponent } from './components/product/productdetail/productdetail.component';
import { ProductcardComponent } from './components/product/productcard/productcard.component';
import { FilterComponent } from './components/product/filter/filter.component';
import { BreadcrumbComponent } from 'src/app/core/components/breadcrumb/breadcrumb.component';
import { PricefilterComponent } from './components/product/filter/pricefilter/pricefilter.component';
import { ProgressDirective } from './components/product/filter/pricefilter/directive/progress.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutDetailsComponent } from './components/checkout/checkout.details.component';
import { CheckoutEditComponent } from './components/checkout/checkout.edit.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductdetailComponent,
    ProductcardComponent,
    FilterComponent,
    BreadcrumbComponent,
    PricefilterComponent,
    ProgressDirective,
    CheckoutComponent,
    CheckoutDetailsComponent,
    CheckoutEditComponent,
    
    
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule, // Include FormsModule here if needed
    ReactiveFormsModule, // Include ReactiveFormsModule here if needed
    SharedModule,
  ]
})
export class ProductModule { }
