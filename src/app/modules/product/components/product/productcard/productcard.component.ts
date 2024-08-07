import { Component,Input,OnInit } from '@angular/core';
import { Product } from '../../../model';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from '../../../services/product.service';
import { Router,NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styles: [
  ]
})
export class ProductcardComponent implements OnInit  {
  @Input() product!:Product;
  ratingList!:boolean[];
  cart:Product[]=[];
  imageSrc!:string[]; // TODO:
  isProductPresent:boolean=this.cart.some(item=>item.id==this.product.id);
  discount=0;
  constructor(private cartService:CartService, private productService:ProductService){}

  ngOnInit(): void {
    this.cart=this.cartService.getCart;
    this.discount=this.product&&Math.round(100-(this.product.price/this.product.prevprice)*100);
    this.getRatingStar();
    this.getAllImageData(this.product.id); // TODO:
  }

  addToCart(product:Product){
   this.cartService.add(product);
  }

  removeFromCart(product:Product){
    this.cartService.remove(product);    
  }

  isProductInCart(product:Product){
    return this.cart.some(item=>item.id==product.id);
  }
  
  getRatingStar(){
    this.ratingList=this.productService.getRatingStar(this.product);
  }

  public getAllImageData(id: any) { // TODO:
    this.productService.getAllImagesByProductId(id).subscribe({
      next: (fetchedImages: any) => {
        this.imageSrc=fetchedImages.data[0];
      },
      error: (error) => {
        console.log(error);
      },
      complete() { },
    });
  }

  getImageUrl(image: any): string { // TODO:
    if (image!.picByte instanceof Uint8Array) {
      const base64String = btoa(String.fromCharCode.apply(null, image!.picByte));
      return 'data:' + image!.type + ';base64,' + base64String;
    } else if (typeof image!.picByte === 'string') {
      // If picByte is already a base64 string
      return 'data:' + image!.type + ';base64,' + image!.picByte;
    }
    return '';
  }
}
