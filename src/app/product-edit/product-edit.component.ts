// product-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-edit',
  standalone: true,
  providers: [ProductService],
  imports: [FormsModule, CommonModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product = { id: 0, name: '', price: 0 };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getProduct(id).subscribe({
        next: (data: Product) => {
          this.product = data;
        },
        error: (err) => {
          console.error('Error fetching product:', err);
          this.router.navigate(['/product-list']);
        }
      });
    } else {
      this.router.navigate(['/product-list']);
    }
  }

  updateProduct(): void {
    this.productService.updateProduct(this.product).subscribe({
      next: () => {
        this.router.navigate(['/product-list']);
      },
      error: (err) => {
        console.error('Error updating product:', err);
      }
    });
  }
}