import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  productForm!: FormGroup;
  sizesOptions: string[] = ['XS','S', 'M', 'L', 'XL','XXL'];
  uploadedImages: File[] = [];
  displayedImages: File[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      category: ['', Validators.required],
      type: ['', Validators.required],
      sizes: this.fb.array([], Validators.required),
      stock: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      prevprice: ['', [Validators.required, Validators.min(0.01)]],

      rating: this.fb.group({
        rate: ['', [Validators.required, Validators.min(0.01), Validators.max(5)]],
        count: ['', [Validators.required]]
      })
    });
  }

  get title() {
    return this.productForm.get('title');
  }

  get price() {
    return this.productForm.get('price');
  }

  get prevprice() {
    return this.productForm.get('prevprice');
  }

  get description() {
    return this.productForm.get('description');
  }

  get category() {
    return this.productForm.get('category');
  }

  get type() {
    return this.productForm.get('type');
  }

  get sizes() {
    return this.productForm.get('sizes');
  }

  get stock() {
    return this.productForm.get('stock');
  }

  get rate() {
    return this.productForm.get('rating.rate');
  }
  
  get count() {
    return this.productForm.get('rating.count');
  }

  ngOnInit(): void {}

  onCheckboxChange(e: any) {
    const sizes: FormArray = this.productForm.get('sizes') as FormArray;
    if (e.target.checked) {
      sizes.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      sizes.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          sizes.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  // Gets called when the user selects images
  public onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploadedImages.push(file);
          this.displayedImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onSave(): void {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.productService.addProduct(this.productForm.value).subscribe({
        next: (product: any) => {
          this.uploadImages(product.id);
        },
        error: (error: any) => {
          console.log('Error saving product', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  uploadImages(productId: number): void {
    if (this.uploadedImages.length > 0) {
      this.uploadedImages.forEach((file: File) => {
        const formData = new FormData();
        formData.append('imageFile', file, file.name);

        this.productService.addImages(productId, formData).subscribe({
          next: (response: any) => {
            // console.log('Image successfully uploaded', response);
          },
          error: (error: any) => {
            console.log('Error uploading image', error);
          }
        });
      });
    }
  }
}
