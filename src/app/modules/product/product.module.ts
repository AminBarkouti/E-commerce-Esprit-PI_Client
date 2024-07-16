import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { ProductComponent } from './components/product/product.component';
import { ProductdetailComponent } from './components/product/productdetail/productdetail.component';
import { ProductcardComponent } from './components/product/productcard/productcard.component';
import { FilterComponent } from './components/product/filter/filter.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductRoutingModule } from './product-routing.module';
import { BreadcrumbComponent } from 'src/app/core/components/breadcrumb/breadcrumb.component';
import { PricefilterComponent } from './components/product/filter/pricefilter/pricefilter.component';
import { ProgressDirective } from './components/product/filter/pricefilter/directive/progress.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddproductComponent } from './components/product/addproduct/addproduct.component';
import { AllproductComponent } from './components/product/allproduct/allproduct.component';
import { NewproductComponent } from './components/product/allproduct/newproduct/newproduct.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductdetailComponent,
    ProductcardComponent,
    FilterComponent,
    CheckoutComponent,
    BreadcrumbComponent,
    PricefilterComponent,
    ProgressDirective,
    AddproductComponent,
    AllproductComponent,
    NewproductComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
    MatInputModule,
  ],
})
export class ProductModule { }
