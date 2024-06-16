import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  product: Product = { id: 0, name: '', price: 0 };

  constructor(private productService: ProductService, private router: Router) { }

  addProduct(): void {
    this.productService.addProduct(this.product).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}