import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutDetailsComponent } from './components/checkout/checkout.details.component';
import { CheckoutEditComponent } from './components/checkout/checkout.edit.component';

const routes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent,
    children: [
      {
        path: 'details',
        component: CheckoutDetailsComponent,
      },
      {
        path: 'checkout-edit',
        component: CheckoutEditComponent,
      },
      // Add more child routes if needed
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
