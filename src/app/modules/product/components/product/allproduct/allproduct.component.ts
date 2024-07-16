import { Component } from '@angular/core';
import { Product } from '../../../model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'app-allproduct',
  templateUrl: './allproduct.component.html',
  styleUrls: ['./allproduct.component.scss']
})
export class AllproductComponent {

  cloneOfProducts: Product[] = [];
  products: Product[] = [];
  category = '';
  isLoading = false;
  isFilter=false;
  subsFilterProducts!:Subscription;
  
  selectedFilter:{rating:BehaviorSubject<number|null>;categoryId:BehaviorSubject<number|null>}={
    rating:new BehaviorSubject<number|null>(null),
    categoryId:new BehaviorSubject<number|null>(null)
  }
  ratingList:boolean[]=[];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.getProductsByCategory();
  }

  getProductsByCategory(): Product[] {
    this.isLoading = true;

    this.productService.getAllProduct().subscribe((products)=>{
      console.log(products);
      this.isLoading = false;
      this.products = products;

    })


    return this.products;
  }
  
  onFilter(value:boolean){
    this.isFilter=value;
  }

  resetFilter(){
    this.selectedFilter.categoryId.next(null);
    this.selectedFilter.rating.next(null);
  }
  

  ngOnDestroy(): void {
    this.subsFilterProducts.unsubscribe();
  }
}
